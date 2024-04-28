import { cookies } from "next/headers";
import { createToken } from "../../lib/jwt";

async function createSession(payload: Record<string, any>) {
  if (!payload) return null;
  const sessionEncrypted = await createToken(payload);

  cookies().set("session.token", sessionEncrypted, {
    secure: true,
    sameSite: "strict",
    httpOnly: true,
    maxAge: Number(process.env.SESSION_EXPIRY) || 1800,
  });
}

async function deleteSession() {
  cookies().delete("session.token");
}

export { createSession, deleteSession };
