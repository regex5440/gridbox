"use server";

import stripe from "@lib/payment.server";

export async function updateAddressInIntent({
  billing,
  shipping,
  intentId,
}: {
  billing: string;
  shipping: string;
  intentId: string;
}) {
  await stripe.paymentIntents.update(intentId, {
    metadata: {
      billingId: billing,
      shippingId: shipping,
    },
  });
}
