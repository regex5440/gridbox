"use server";

import { decryptToken } from "../lib/jwt";
import { verifyEmail } from "../controllers/account";
import { createStripeCustomer } from "@lib/stripe/actions.server";

export default async function emailVerify(token: string) {
  const payload = await decryptToken<{
    userId?: string;
    email?: string;
    type?: string;
  }>(token);
  if (!payload) {
    return { error: { message: "Invalid token" } };
  }
  const { email, userId, type, exp } = payload;
  if (
    exp &&
    type === "verify" &&
    typeof email === "string" &&
    typeof userId === "string" &&
    typeof name === "string"
  ) {
    const expiryDate = new Date(exp * 1000);
    if (expiryDate < new Date()) {
      return { error: { message: "Token has expired" } };
    }
    const stripeCustomer = await createStripeCustomer(name, email);
    const user = await verifyEmail({
      email,
      id: userId,
      stripeCustomerId: stripeCustomer.id,
    });
    if (user) {
      return { success: true };
    }
  } else {
    return { error: { message: "Invalid token" } };
  }
}
