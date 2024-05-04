"use server";
import { getUserById } from "@app/controllers/account";
import { decryptToken } from "@lib/jwt";
import { cookies } from "next/headers";

export default async function authenticateUser() {
  const token = cookies().get("session.token")?.value;
  if (!token) {
    return { error: { message: "Invalid token" } };
  }
  const payload = await decryptToken<{ id: string }>(token);
  if (!payload) {
    return { error: { message: "Invalid token" } };
  }
  const { id } = payload;
  if (typeof id === "string") {
    const user = await getUserById(id);
    if (user) {
      return { data: user, success: true };
    }
  }
  return { error: { message: "Invalid token" } };
}
