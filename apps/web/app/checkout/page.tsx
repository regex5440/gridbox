import type { CartItem } from "@repo/ui/types";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getUserAddresses } from "@actions/account";
import { getAuthenticateUser } from "@actions/auth";
import { getCartBreakup } from "@actions/cart";
import { getCartItems } from "controllers/cart";
import stripe from "@lib/stripe/payment.server";
import SiteMap from "@utils/sitemap";
import Checkout from "./Checkout";
import type { ProductDetail } from "./common";
//TODO: can optimize by reducing number of time authentication check happens in each action

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: string;
}) {
  const authenticatedUser = await getAuthenticateUser();
  const redirectURLParams = new URLSearchParams(searchParams);
  if (!authenticatedUser.success) {
    const paramsString = redirectURLParams.toString();
    return redirect(
      `/signin?redirect=/checkout${paramsString.length > 0 ? `?${paramsString}` : ""}`
    );
  }

  if (!authenticatedUser.data.stripeCustomerId) {
    return redirect(
      `${SiteMap.Verify.path}?user=${authenticatedUser.data.id}&resent=0`
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
  const productDetails = await Promise.all(
    cartItems.map(({ productId, quantity }) =>
      fetch(`${process.env.productAPI}/products/${productId}`)
        .then((res) => res.json())
        .then((data: ProductDetail) => {
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
        setup_future_usage: "on_session",
      },
    },
  });
  return (
    <div>
      {cartBreakup === undefined ||
      userAddress.error ||
      !paymentIntent.client_secret ? (
        <div className="text-center text-2xl">Something went wrong</div>
      ) : (
        <Checkout
          anyItemNotInStock={anyItemNotInStock}
          cartBreakup={cartBreakup}
          clientSecret={paymentIntent.client_secret}
          productDetailList={productDetails}
          userAddress={userAddress.success.data || []}
          usingCart={usingCartItems}
        />
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Checkout - GridBox",
  description:
    "Checkout page for GridBox e-commerce site. Pay and place your order. Payment powered by Stripe",
};
