"use server";

import { authenticateUser } from "./auth";
import { ProductPurchaseFormState } from "@types";
import { CartProductAddSchema } from "@lib/definitions/account";
import {
  clearCart,
  removeItemFromCart,
  updateItemQuantity,
} from "controllers/cart";
import { CartItem } from "@repo/ui/types";

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

export async function clearUserCart() {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;

  const updatedData = await clearCart({ userId });
  if (!updatedData) {
    return { error: { message: "Failed to clear cart" } };
  }
  return {
    success: {
      data: {
        cleared: true,
      },
    },
  };
}

export async function getCartBreakup(cartItems: CartItem[] | null) {
  const cartTotal = {
    subTotal: 0,
    maxDiscountPercentage: 0,
    discountedPrice: 0,
    tax: 0,
    payable: 0,
  };

  if (!cartItems) {
    return cartTotal;
  }
  const cartProducts = await Promise.all(
    cartItems.map(({ productId }) =>
      fetch(
        `${process.env.productAPI}/products/${productId}?select=discountPercentage,price`
      ).then((res) => res.json())
    )
  );

  const subTotal = cartProducts.reduce(
    (acc: number, product, index) =>
      acc + product.price * cartItems[index].quantity,
    0
  );
  const maxDiscountPercentage = cartProducts.reduce(
    (acc: number, product) =>
      acc > product.discountPercentage ? acc : product.discountPercentage,
    0
  );
  const discountedPrice = subTotal * (maxDiscountPercentage / 100);
  const tax = discountedPrice * 0.1; // 10%

  cartTotal.subTotal = Number(subTotal.toFixed(2));
  cartTotal.maxDiscountPercentage = Number(maxDiscountPercentage.toFixed(2));
  cartTotal.discountedPrice = Number(discountedPrice.toFixed(2));
  cartTotal.tax = Number(tax.toFixed(2));
  cartTotal.payable = Number((subTotal - discountedPrice + tax).toFixed(2));
  return cartTotal;
}
