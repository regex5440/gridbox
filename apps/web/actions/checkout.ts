"use server";

import stripe from "@lib/stripe/payment.server";
import { getOrderInfo } from "controllers/order";
import { authenticateUser } from "./auth";

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

export async function getPaymentMethods(customerId: string) {
  return stripe.customers.listPaymentMethods(customerId, { type: "card" });
}

export async function updateMetadataInIntent({
  intentId,
  metadata,
}: {
  intentId: string;
  metadata: Record<string, string>;
}) {
  await stripe.paymentIntents.update(intentId, {
    metadata,
  });
}

export async function getOrderByIntent({
  paymentIntent,
}: {
  paymentIntent: string;
}) {
  const authenticUser = await authenticateUser();
  if (!authenticUser) {
    return { error: "User not authenticated" };
  }
  const request = await getOrderInfo({ intentId: paymentIntent });
  if (!request?.data) {
    return { error: "Order not found" };
  }
  return { data: request.data };
}
