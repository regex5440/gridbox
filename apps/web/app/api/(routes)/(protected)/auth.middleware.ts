import { decryptToken } from "@lib/jwt";
import { cookies } from "next/headers";
import { NextMiddleware, NextResponse } from "next/server";

// declare global {
//   namespace NextRequest {
//     interface Request {
//       userId: string;
//     }
//   }
// }

const authMiddleware: NextMiddleware = async (req, event) => {
  const requestedPath = req.nextUrl.pathname;
  const sessionToken = cookies().get("session.token")?.value;

  let customRedirectURL = requestedPath.startsWith("/api")
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
  console.log(requestedPath, "->", customRedirectURL);
  return NextResponse.redirect(new URL(customRedirectURL, req.url));
};

export default authMiddleware;
