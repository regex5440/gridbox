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
  const sessionToken = cookies().get("session.token")?.value;
  if (!sessionToken) {
    return redirect("/signin");
  }
  const decryptedToken = await decryptToken<{ id: string }>(sessionToken);
  if (!decryptedToken) {
    return redirect("/signin");
  }
  //TODO: pass this id to routes decryptedToken.id;
};

export default authMiddleware;
