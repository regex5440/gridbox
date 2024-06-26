"use server";

import stripe from "@lib/payment.server";

export const removePaymentMethod = async (paymentMethodId: string) => {
  return stripe.paymentMethods.detach(paymentMethodId);
};

export const createStripeCustomer = async (name: string, email: string) => {
  return await stripe.customers.create({
    name: name.trim(),
    email: email.trim(),
  });
};
