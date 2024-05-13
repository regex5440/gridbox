"use server";

import { authenticateUser } from "./auth";
import { ProductPurchaseFormState } from "@types";
import { CartProductAddSchema } from "@lib/definitions";
import { removeItemFromCart, updateItemQuantity } from "controllers/cart";

export async function buyNowAction(
  state: ProductPurchaseFormState,
  formData: FormData
) {
  const authenticUser = await authenticateUser();
  let isAuthenticated = false;
  if (authenticUser.success) {
    isAuthenticated = true;
  }
  const validData = CartProductAddSchema.safeParse({
    productId: formData.get("productId"),
    quantity: Number(formData.get("quantity")),
  });

  if (!validData.success) {
    console.log(validData.error);
    return { error: { message: "Invalid data" } };
  }
  const redirectURLParam = new URLSearchParams({
    type: "buy_now",
    productId: validData.data.productId,
    quantity: String(validData.data.quantity),
  });

  const redirectURL = `/checkout?${redirectURLParam.toString()}`;

  console.log(formData, redirectURL);
  if (isAuthenticated) {
    return { success: { redirect: redirectURL } };
  } else {
    return {
      error: {
        message: "Unauthorized",
        redirect: `/signin?redirect=${redirectURL}`,
      },
    };
  }
  //? Approach: Use the URL to redirect to cart page. This will keep the buy now product separate from the cart.
  //?: Create the redirect URL with product and quantity information
  //?: cart page should handle the redirect URL if provided with query params or with cart products, if query not present.
}

export async function updateCartItemQty({
  quantity,
  productId,
}: {
  quantity: number;
  productId: string;
}) {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;

  const updatedData = await updateItemQuantity({ productId, quantity, userId });
  if (!updatedData.data) {
    return { error: { message: "Failed to add product to cart" } };
  }
  return {
    success: {
      data: {
        productId: updatedData.data.productId,
        quantity: updatedData.data.quantity,
      },
    },
  };
}

export async function removeCartItem(productId: string) {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;

  const updatedData = await removeItemFromCart({ productId, userId });
  if (!updatedData.data) {
    return { error: { message: "Failed to remove product from cart" } };
  }
  return {
    success: {
      data: {
        productId: updatedData.data.productId,
        removed: true,
      },
    },
  };
}
