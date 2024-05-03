import { cookies } from "next/headers";
import { createEncryptedToken } from "@lib/jwt";

async function createSession(payload: Record<string, any>) {
  if (!payload) return null;
  const sessionEncrypted = await createEncryptedToken(payload);

  return cookies().set("session.token", sessionEncrypted, {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
    maxAge: Number(process.env.SESSION_EXPIRY),
  });
}

async function deleteSession() {
  cookies().delete("session.token");
}

export { createSession, deleteSession };
