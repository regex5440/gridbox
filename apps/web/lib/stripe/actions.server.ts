"use server";

import stripe from "@lib/stripe/payment.server";

export const removePaymentMethod = async (paymentMethodId: string) => {
  await stripe.paymentMethods.detach(paymentMethodId);
  return true;
};

export const createStripeCustomer = async (name: string, email: string) => {
  return stripe.customers.create({
    name: name.trim(),
    email: email.trim(),
  });
};
