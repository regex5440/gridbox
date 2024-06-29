import authMiddleware from "@app/api/(routes)/(protected)/auth.middleware";
import { cookies } from "next/headers";
import { NextMiddleware, NextResponse } from "next/server";

const combinedMiddleware: (middlewares: NextMiddleware[]) => NextMiddleware =
  (middlewares) => (req, event) => {
    const requestedRedirect = req.nextUrl.href.split("redirect=")[1];
    if (req.nextUrl.pathname.startsWith("/signin")) {
      const session = cookies().get("session.token")?.value;
      if (session) {
        return NextResponse.redirect(
          new URL(
            decodeURIComponent(requestedRedirect) || "/",
            req.nextUrl.origin
          )
        );
      }
    } else {
      middlewares.forEach((middleware) => middleware(req, event));
    }
  };

export default combinedMiddleware([authMiddleware]);

export const config = {
  matcher: [
    "/api/account/:path*",
    "/api/cart/:path*",
    // "/checkout",
    // "/account/:path*",
    // "/signin",
  ],
};
