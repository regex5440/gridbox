import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getAuthenticateUser } from "@actions/auth";
import SiteMap from "@utils/sitemap";
import { getPaymentMethods } from "@actions/checkout";
import PaymentMethodInterface from "./PaymentMethodInterface";

export default async function PaymentInfo() {
  const authenticUserData = await getAuthenticateUser();

  if (!authenticUserData.success) {
    return redirect(
      `${SiteMap.Signin.path}?redirect=${SiteMap.Account.Payment.path}`
    );
  }
  if (!authenticUserData.data.stripeCustomerId) {
    return redirect(
      `${SiteMap.Verify.path}?user=${authenticUserData.data.id}&resend=1`
    );
  }

  const paymentMethods = await getPaymentMethods(
    authenticUserData.data.stripeCustomerId
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
