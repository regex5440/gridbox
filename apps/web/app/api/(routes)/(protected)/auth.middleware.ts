import { decryptToken } from "@lib/jwt";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextMiddleware, NextRequest } from "next/server";

declare global {
  namespace NextRequest {
    interface Request {
      userId: string;
    }
  }
}

const authMiddleware: NextMiddleware = async (req, event) => {
  const requestedPath = req.nextUrl.pathname;
  const redirectURL = !requestedPath.startsWith("/api")
    ? `/signin?redirect=${requestedPath}`
    : `/signin`;
  const sessionToken = cookies().get("session.token")?.value;
  if (!sessionToken) {
    return redirect(redirectURL);
  }
  const decryptedToken = await decryptToken<{ id: string }>(sessionToken);
  if (!decryptedToken) {
    return redirect(redirectURL);
  }
  //TODO: pass this id to routes decryptedToken.id;
};

export default authMiddleware;
