import { getAuthenticateUser } from "@actions/auth";
import stripe from "@lib/payment.server";
import SiteMap from "@utils/sitemap";
import { redirect } from "next/navigation";
import PaymentMethodUI from "./PaymentMethodUI";

export default async function PaymentInfo() {
  const authenticUserData = await getAuthenticateUser();

  if (!authenticUserData.success) {
    return redirect(
      SiteMap.Signin.path + "?redirect=" + SiteMap.Account.Payment.path
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
        <PaymentMethodUI PaymentMethodList={paymentMethods.data} />
      ) : (
        <p className="text-center my-4">No cards saved!</p>
      )}
    </div>
  );
}
