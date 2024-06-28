import { cookies } from "next/headers";
import type { NextMiddleware } from "next/server";
import { NextResponse } from "next/server";
import { decryptToken } from "@lib/jwt";

// declare global {
//   namespace NextRequest {
//     interface Request {
//       userId: string;
//     }
//   }
// }

const authMiddleware: NextMiddleware = async (req) => {
  const requestedPath = req.nextUrl.pathname;
  const sessionToken = cookies().get("session.token")?.value;

  const customRedirectURL = requestedPath.startsWith("/api")
    ? "/signin"
    : `/signin?redirect=${requestedPath}`;
  if (sessionToken) {
    const decryptedToken = await decryptToken<{ id: string }>(sessionToken);
    if (decryptedToken) {
      //TODO: pass this id to routes decryptedToken.id;
      //ALL OK
      return;
    }
  }
  return NextResponse.redirect(new URL(customRedirectURL, req.url));
};

export default authMiddleware;
