import { redirect } from "next/navigation";
import { getAuthenticateUser } from "@actions/auth";
import stripe from "@lib/stripe/payment.server";
import SiteMap from "@utils/sitemap";
import PaymentMethodInterface from "./PaymentMethodInterface";
import { Metadata } from "next";

export default async function PaymentInfo() {
  const authenticUserData = await getAuthenticateUser();

  if (!authenticUserData.success) {
    return redirect(
      `${SiteMap.Signin.path}?redirect=${SiteMap.Account.Payment.path}`
    );
  }

  const paymentMethods = await stripe.customers.listPaymentMethods(
    authenticUserData.data.stripeCustomerId,
    { type: "card" }
  );

  return (
    <div>
      <h1 className="text-2xl semibold max-lg:hidden">Saved Cards</h1>
      {paymentMethods.data.length > 0 ? (
        <PaymentMethodInterface PaymentMethodList={paymentMethods.data} />
      ) : (
        <p className="text-center my-4">No cards saved!</p>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Account/Saved Payment Info - GridBox",
  description:
    "View and manage your saved payment methods on GridBox e-commerce site",
};
