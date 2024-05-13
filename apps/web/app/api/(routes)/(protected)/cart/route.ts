import { authenticateUser } from "actions/auth";
import { addItemsToCart, getCartItems } from "controllers/cart";
import { CartProductAddSchema } from "@lib/definitions";
import { NextRoute } from "@types";

export const GET: NextRoute = async (request, { params }) => {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return Response.json(
      { error: { message: "Unauthorized" } },
      { status: 401 }
    );
  }
  const userId = authenticUser.data.id;
  const cartProducts = await getCartItems({ userId });
  if (!cartProducts.data) {
    return Response.json(
      { error: { message: "Failed to get cart items" } },
      { status: 500 }
    );
  }
  return Response.json({ success: true, data: cartProducts.data });
};

export const POST: NextRoute = async (request, { params }) => {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return Response.json(
      { error: { message: "Unauthorized" } },
      { status: 401 }
    );
  }
  const userId = authenticUser.data.id;
  const body = await request.json();
  const validated = CartProductAddSchema.safeParse(body);
  if (!validated.success) {
    return Response.json(
      { error: { message: validated.error.message } },
      { status: 400 }
    );
  }
  const updatedData = await addItemsToCart({
    productId: validated.data.productId,
    quantity: validated.data.quantity,
    userId,
  });
  if (!updatedData.data) {
    return Response.json(
      { error: { message: "Failed to add product to cart" } },
      { status: 500 }
    );
  }
  return Response.json({ success: true, data: updatedData.data });
};
