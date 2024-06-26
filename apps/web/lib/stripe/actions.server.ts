"use server";

import stripe from "@lib/payment.server";

export const removePaymentMethod = async (paymentMethodId: string) => {
  return stripe.paymentMethods.detach(paymentMethodId);
};
