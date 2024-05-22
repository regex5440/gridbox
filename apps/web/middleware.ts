import authMiddleware from "@app/api/(routes)/(protected)/auth.middleware";
import { cookies } from "next/headers";
import { NextMiddleware, NextResponse } from "next/server";

const combinedMiddleware: (middlewares: NextMiddleware[]) => NextMiddleware =
  (middlewares) => (req, event) => {
    const requestedRedirect = req.nextUrl.searchParams.get("redirect");
    if (req.nextUrl.pathname.startsWith("/signin")) {
      const session = cookies().get("session.token")?.value;
      if (session) {
        return NextResponse.redirect(
          new URL(requestedRedirect || "/", req.url)
        );
      }
    } else {
      middlewares.forEach((middleware) => middleware.apply(null, [req, event]));
    }
  };

export default combinedMiddleware([authMiddleware]);

export const config = {
  matcher: [
    "/api/account/:path*",
    "/api/cart/:path*",
    "/checkout",
    "/account",
    "/signin",
  ],
};
