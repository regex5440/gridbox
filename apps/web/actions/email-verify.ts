"use server";

import { createEncryptedToken, decryptToken } from "../lib/jwt";
import { verifyEmail } from "../controllers/account";
import { createStripeCustomer } from "@lib/stripe/actions.server";
import EmailTemplate from "@lib/email-template";
import SiteMap from "@utils/sitemap";
import sendEmail from "@lib/mailer";

export default async function emailVerify(token: string) {
  const payload = await decryptToken<{
    userId?: string;
    email?: string;
    type?: string;
    name?: string;
  }>(token);
  if (!payload) {
    return { error: { message: "Invalid token" } };
  }
  const { email, userId, type, exp, name } = payload;
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

export async function sendVerificationEmail({
  email,
  userId,
  firstName,
  lastName,
}: {
  email: string;
  userId: string;
  firstName: string;
  lastName: string;
}) {
  const verificationToken = await createEncryptedToken(
    {
      email,
      type: "verify",
      userId: userId,
      name: `${firstName} ${lastName}`.trim(),
    },
    "2h"
  );
  const verificationEmail = new EmailTemplate("verification")
    .values({
      verificationLink: `${process.env.ASSIGNED_URL}${SiteMap.Verify.path}?token=${verificationToken}`,
    })
    .toHTML();
  await sendEmail({
    html: verificationEmail,
    subject: "Verify your email",
    to: email,
  });
}
