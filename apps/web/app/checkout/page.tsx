import { getUserAddresses } from "@actions/account";
import { getAuthenticateUser } from "@actions/auth";
import { getCartBreakup } from "@actions/cart";
import { CartItem } from "@repo/ui/types";
import { NextPageProps } from "@types";
import { getCartItems } from "controllers/cart";
import { redirect } from "next/navigation";
import Checkout from "./Checkout";
import { ProductDetail } from "./common";
import stripe from "@lib/payment.server";
//TODO: can optimize by reducing number of time authentication check happens in each action

export default async function CheckoutPage({ searchParams }: NextPageProps) {
  const authenticatedUser = await getAuthenticateUser();
  const redirectURLParams = new URLSearchParams(searchParams);
  if (!authenticatedUser.success) {
    const paramsString = redirectURLParams.toString();
    return redirect(
      `/signin?redirect=/checkout${paramsString.length > 0 ? `?${paramsString}` : ""}`
    );
  }

  let cartItems: CartItem[] = [];
  let usingCartItems = false;
  if (
    redirectURLParams.get("type") === "buy_now" &&
    redirectURLParams.has("productId") &&
    redirectURLParams.has("quantity")
  ) {
    const productId = redirectURLParams.get("productId");
    const quantity = Number(redirectURLParams.get("quantity"));
    //Buy now items
    if (productId && !isNaN(quantity) && quantity > 0) {
      cartItems = [
        {
          productId,
          quantity,
        },
      ];
    } else {
      return redirect("/cart");
    }
  } else {
    //Cart items
    cartItems = await getCartItems({ userId: authenticatedUser.data.id }).then(
      (res) => res.data
    );
    usingCartItems = true;
  }

  let anyItemNotInStock = false;
  const productDetails: ProductDetail[] = await Promise.all(
    cartItems?.map(({ productId, quantity }) =>
      fetch(`${process.env.productAPI}/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.stock <= 0) {
            anyItemNotInStock = true;
          }
          return { ...data, quantity };
        })
    )
  );

  if (productDetails.length === 0) {
    return redirect("/cart");
  }
  const [cartBreakup, userAddress] = await Promise.all([
    getCartBreakup(cartItems),
    getUserAddresses(),
  ]);
  //TODO: show saved cards and allow selection from it
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(cartBreakup.payable * 100),
    currency: "inr",
    metadata: {
      buyNowOrder: redirectURLParams.get("type") === "buy_now" ? 1 : 0,
      cartBreakup: JSON.stringify(cartBreakup),
      forUser: authenticatedUser.data.id,
      cartItems: JSON.stringify(cartItems),
    },
    customer: authenticatedUser.data.stripeCustomerId,
    payment_method_options: {
      card: {
        setup_future_usage: "off_session",
      },
    },
  });
  return (
    <div>
      {cartBreakup === undefined ||
      userAddress?.error ||
      !paymentIntent.client_secret ? (
        <div className="text-center text-2xl">Something went wrong</div>
      ) : (
        <Checkout
          productDetailList={productDetails}
          userAddress={userAddress.success?.data || []}
          cartBreakup={cartBreakup}
          anyItemNotInStock={anyItemNotInStock}
          clientSecret={paymentIntent.client_secret}
          usingCart={usingCartItems}
        />
      )}
    </div>
  );
}
