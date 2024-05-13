import { authenticateUser } from "actions/auth";
import { getCartItems } from "controllers/cart";
import { NextRoute } from "@types";

export const GET: NextRoute = async (request, { params }) => {
  try {
    const authenticUser = await authenticateUser();
    if (!authenticUser.success) {
      return Response.json({
        error: { message: "Unauthorized", redirect: "/signin" },
      });
    }
    const cartItems = await getCartItems({ userId: authenticUser.data.id });

    const cartTotal = {
      subTotal: 0,
      maxDiscountPercentage: 0,
      discountedPrice: 0,
      tax: 0,
      payable: 0,
    };

    if (!cartItems.data) {
      return Response.json({ success: { data: cartTotal } });
    }
    const cartProducts = await Promise.all(
      cartItems.data.map(({ productId }) =>
        fetch(`${process.env.productAPI}/products/${productId}`).then((res) =>
          res.json()
        )
      )
    );

    const subTotal = cartProducts.reduce(
      (acc: number, product, index) =>
        acc + product.price * cartItems.data[index].quantity,
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
    return Response.json({ success: { data: cartTotal } });
  } catch (error) {
    return Response.json(
      { error: { message: "Failed to get cart total" } },
      { status: 500 }
    );
  }
};
