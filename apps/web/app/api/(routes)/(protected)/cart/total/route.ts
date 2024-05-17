import { authenticateUser } from "actions/auth";
import { getCartItems } from "controllers/cart";
import { NextRoute } from "@types";
import { getCartBreakup } from "@actions/cart";

export const GET: NextRoute = async (request, { params }) => {
  try {
    const authenticUser = await authenticateUser();
    if (!authenticUser.success) {
      return Response.json({
        error: { message: "Unauthorized", redirect: "/signin" },
      });
    }
    const cartItems = await getCartItems({ userId: authenticUser.data.id });

    const data = await getCartBreakup(cartItems.data);
    return Response.json({ success: { data } });
  } catch (error) {
    return Response.json(
      { error: { message: "Failed to get cart total" } },
      { status: 500 }
    );
  }
};
