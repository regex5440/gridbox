"use server";

import { decryptToken } from "../../lib/jwt";
import { verifyEmail } from "../controllers/account";

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
    typeof userId === "string"
  ) {
    const expiryDate = new Date(exp * 1000);
    if (expiryDate < new Date()) {
      return { error: { message: "Token has expired" } };
    }
    const user = await verifyEmail({ email, id: userId });
    if (user) {
      return { success: true };
    }
  } else {
    return { error: { message: "Invalid token" } };
  }
}
