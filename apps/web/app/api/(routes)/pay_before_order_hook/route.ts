"use server";
import type { CartItem } from "@repo/ui/types";
import type Stripe from "stripe";
import { getCartBreakup } from "@actions/cart";
import { PaymentIntentMetadataSchema } from "@lib/definitions/order";
import stripe from "@lib/stripe/payment.server";
import type { NextRoute } from "@types";
import { getUserShippingInfo } from "controllers/account";
import { clearCart } from "controllers/cart";
import { createOrder } from "controllers/order";

interface Payment extends Stripe.PaymentIntent {
  metadata: {
    forUser: string;
    cartItems: string;
    buyNowOrder: string;
    cartBreakup: string;
    shippingId: string;
    billingId: string;
    savePayment?: string;
  };
}
export const POST: NextRoute = async (request) => {
  const paymentIntentEvent = await request.json();
  if (paymentIntentEvent.type !== "payment_intent.succeeded") {
    return new Response(null, { status: 204 });
  }
  const paymentIntent = paymentIntentEvent.data.object as Payment;
  let errorResponse: Response | undefined;
  try {
    const paymentMetadata = paymentIntent.metadata || null;

    if (!paymentMetadata) {
      errorResponse = Response.json(
        { error: "Invalid Payment Intent", received: paymentIntent },
        { status: 400 }
      );
      throw new Error("Invalid Payment Intent");
    }
    //? ORDER GENERATION LOGIC WITH BILLING INFO UPDATE
    const validatedPaymentIntentMetadata =
      PaymentIntentMetadataSchema.safeParse({
        forUser: paymentMetadata.forUser,
        shippingId: paymentMetadata.shippingId,
        billingId: paymentMetadata.billingId,
        buyNowOrder: paymentMetadata.buyNowOrder,
        items: JSON.parse(paymentMetadata.cartItems),
        savePayment: paymentMetadata.savePayment,
      });

    if (!validatedPaymentIntentMetadata.success) {
      errorResponse = Response.json(
        {
          error: validatedPaymentIntentMetadata.error.flatten().fieldErrors,
          received: paymentMetadata,
        },
        { status: 400 }
      );
      throw new Error("Invalid Payment Intent Metadata");
    }
    const userId = validatedPaymentIntentMetadata.data.forUser;
    const shippingId = validatedPaymentIntentMetadata.data.shippingId;
    const billingId = validatedPaymentIntentMetadata.data.billingId;
    const cartItems = validatedPaymentIntentMetadata.data.items as CartItem[];
    const savePayment = validatedPaymentIntentMetadata.data.savePayment;

    if (savePayment === "0" && typeof paymentIntent.payment_method === "string") {
      await stripe.paymentMethods.detach(paymentIntent.payment_method);
    }

    const [cartProducts, userShippingAddressList, cartBreakup] =
      await Promise.all([
        Promise.all(
          cartItems.map((item) =>
            fetch(
              `${process.env.productAPI}/products/${item.productId}?select=title,price`
            )
              .then((res) => res.json())
              .then((data) => ({
                name: data.title,
                price: data.price,
                quantity: item.quantity,
                id: String(data.id as number),
              }))
          )
        ),
        getUserShippingInfo(userId),
        getCartBreakup(cartItems),
      ]);
    if (userShippingAddressList.length === 0) {
      errorResponse = Response.json(
        { error: "User has no address information" },
        { status: 400 }
      );
      throw new Error("User has no address information");
    }
    const shippingAddress = userShippingAddressList.find(
      (address) => address.id === shippingId
    );
    const billingAddress = userShippingAddressList.find(
      (address) => address.id === billingId
    );

    if (!shippingAddress || !billingAddress) {
      errorResponse = Response.json(
        { error: "Invalid Address" },
        { status: 400 }
      );
      throw new Error("Invalid Address");
    }

    const shippingAddressString = `${shippingAddress.fullName}\n${shippingAddress.address}, ${shippingAddress.city},\n${shippingAddress.state}, ${shippingAddress.country} (${shippingAddress.zip})`;

    //? Generate the order
    const orderCreationResponse = await createOrder({
      contactInfo: shippingAddress.phone,
      shippingLocation: shippingAddressString,
      userId,
      paymentIntent: paymentIntent.id,
      items: cartProducts,
      initOrderStatus: "pending",
      paymentStatus: "success",
      discountPercentage: cartBreakup.maxDiscountPercentage,
      paidAmount: cartBreakup.payable,
      tax: cartBreakup.tax,
    });

    //? Clear the cart
    if (typeof orderCreationResponse.data.id === "undefined") {
      errorResponse = new Response("Order creation failed", { status: 500 });
      throw new Error("Order creation failed");
    }

    if (validatedPaymentIntentMetadata.data.buyNowOrder !== "1") {
      clearCart({ userId });
    }

    return new Response(null, { status: 204 });
  } catch (e) {
    await stripe.refunds.create({
      payment_intent: paymentIntent.id,
    });
    return errorResponse || new Response(e as string, { status: 500 });
  }
};
