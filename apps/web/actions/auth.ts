"use server";
import { getUserWithPrivateDetails } from "controllers/account";
import { decryptToken } from "@lib/jwt";
import { cookies } from "next/headers";

export async function authenticateUser() {
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
    return { data: { id }, success: true };
  }
  return { error: { message: "Invalid token" } };
}

export async function getAuthenticateUser() {
  const authenticUser = await authenticateUser();
  if (authenticUser?.success) {
    const user = await getUserWithPrivateDetails(authenticUser.data.id);
    if (user) {
      return { data: user, success: true };
    }
  }
  return { error: { message: "User does not exists" } };
}
