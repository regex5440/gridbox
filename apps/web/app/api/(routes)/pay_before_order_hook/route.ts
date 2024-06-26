"use server";
import { getCartBreakup } from "@actions/cart";
import { PaymentIntentMetadataSchema } from "@lib/definitions/order";
import stripe from "@lib/payment.server";
import { CartItem } from "@repo/ui/types";
import { PaymentIntent as PI } from "@stripe/stripe-js";
import { NextRoute } from "@types";
import { getUserShippingInfo } from "controllers/account";
import { clearCart } from "controllers/cart";
import { createOrder } from "controllers/order";

const IntentStatusMap: {
  [key: string]: Parameters<typeof createOrder>[0]["paymentStatus"];
} = {
  succeeded: "success",
  processing: "pending",
  canceled: "failed",
  requires_payment_method: "failed",
  requires_confirmation: "pending",
  requires_action: "failed",
  requires_capture: "pending",
};
interface PaymentIntent extends PI {
  metadata: {
    forUser: string;
    cartItems: string;
    buyNowOrder: string;
    cartBreakup: string;
    shippingId: string;
    billingId: string;
  };
}
export const POST: NextRoute = async (request, { params }) => {
  //TODO: Initiate refund if order creation fails

  const paymentIntentEvent = await request.json();
  if (paymentIntentEvent.type !== "payment_intent.succeeded") {
    return new Response(null, { status: 204 });
  }
  const paymentIntent = paymentIntentEvent.data.object as PaymentIntent;
  const paymentMetadata = paymentIntent.metadata || null;

  if (!paymentMetadata) {
    return Response.json(
      { error: "Invalid Payment Intent", received: paymentIntent },
      { status: 400 }
    );
  }
  //? ORDER GENERATION LOGIC WITH BILLING INFO UPDATE
  const validatedPaymentIntentMetadata = PaymentIntentMetadataSchema.safeParse({
    forUser: paymentMetadata.forUser,
    shippingId: paymentMetadata.shippingId,
    billingId: paymentMetadata.billingId,
    buyNowOrder: parseInt(paymentMetadata.buyNowOrder),
    items: JSON.parse(paymentMetadata.cartItems),
  });

  if (!validatedPaymentIntentMetadata.success) {
    return Response.json(
      { error: "Invalid Payment Intent Metadata", received: paymentMetadata },
      { status: 400 }
    );
  }
  const userId = validatedPaymentIntentMetadata.data.forUser;
  const shippingId = validatedPaymentIntentMetadata.data.shippingId;
  const billingId = validatedPaymentIntentMetadata.data.billingId;
  const cartItems = validatedPaymentIntentMetadata.data.items as CartItem[];

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
    return Response.json(
      { error: "User has no address information" },
      { status: 400 }
    );
  }
  const shippingAddress = userShippingAddressList.find(
    (address) => address.id === shippingId
  );
  const billingAddress = userShippingAddressList.find(
    (address) => address.id === billingId
  );

  if (!shippingAddress || !billingAddress) {
    return Response.json({ error: "Invalid Address" }, { status: 400 });
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
    paymentStatus: IntentStatusMap[paymentIntent.status],
    discountPercentage: cartBreakup.maxDiscountPercentage,
    paidAmount: cartBreakup.payable,
    tax: cartBreakup.tax,
  });

  //? Clear the cart
  if (typeof orderCreationResponse?.data?.id === "undefined") {
    await stripe.refunds.create({
      payment_intent: paymentIntent.id,
    });
    return new Response("Order creation failed", { status: 500 });
  }

  if (!validatedPaymentIntentMetadata.data.buyNowOrder) {
    clearCart({ userId });
  }

  return new Response(null, { status: 204 });
};
