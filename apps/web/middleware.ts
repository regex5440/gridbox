import authMiddleware from "@app/api/(routes)/(protected)/auth.middleware";
import { NextMiddleware } from "next/server";

const combinedMiddleware: (middlewares: NextMiddleware[]) => NextMiddleware =
  (middlewares) => (req, event) => {
    middlewares.forEach((middleware) => middleware.apply(null, [req, event]));
  };

export default combinedMiddleware([authMiddleware]);

export const config = {
  matcher: ["/api/account/:path*", "/api/cart/:path*", "/checkout", "/account"],
};
