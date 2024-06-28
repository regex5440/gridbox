"use client";
import { Button, Loader } from "@repo/ui";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import useMiniCart from "@lib/store/minicart";
import { removeCartItem, updateCartItemQty } from "actions/cart";
import CartItem from "../../components/CartItem";

type CartTotal = {
  subTotal: number;
  maxDiscountPercentage: number;
  discountedPrice: number;
  tax: number;
  payable: number;
};

export default function CartPage() {
  const { cartItems, fetchCart, loadingCart } = useMiniCart();
  const [cartTotal, setCartTotal] = useState<{
    loading: boolean;
    data: CartTotal | null;
  }>({
    loading: true,
    data: null,
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      setCartTotal((state) => ({ ...state, loading: true }));
      try {
        fetch("/api/cart/total").then(async (res) => {
          const resJson = await res.json();
          setCartTotal({ data: resJson.success.data, loading: false });
        });
      } catch (e) {
        // console.error(e);
        setCartTotal((state) => ({ ...state, loading: false }));
      }
    } else {
      setCartTotal({ data: null, loading: false });
    }
  }, [cartItems, setCartTotal]);

  return (
    <div className="px-common-x lg:mx-auto flex lg:justify-around max-lg:justify-between lg:w-10/12 max-lg:w-full max-md:flex-col max-w-screen-xl min-h-[60vh] mt-4">
      <div className="md:w-1/2 group/items group-last:border-0">
        <h1 className="text-3xl mb-4">Cart</h1>
        {loadingCart ? (
          <div>
            <Loader className="mx-auto" iconSize={30} />
          </div>
        ) : (
          cartItems.map(({ productId, quantity }) => (
            <CartItem
              className="mb-2 [&:last-child]:border-0"
              initialQty={quantity}
              key={productId}
              onQtyChange={(qty, forProductId) => {
                updateCartItemQty({
                  productId: forProductId,
                  quantity: qty,
                }).then(fetchCart);
              }}
              onRemove={(pId) => {
                removeCartItem(pId).then(fetchCart);
              }}
              productId={productId}
            />
          ))
        )}
        {cartItems.length === 0 && (
          <p className="text-center text-xl h-[40vh] my-10">No items </p>
        )}
      </div>
      <div
        className="md:border-l h-fit lg:w-1/3 md:w-2/5 max-md:border-t max-md:p-4 px-4 md:mt-12 sticky top-20 data-[loading=true]:pointer-events-none data-[loading=true]:opacity-50 data-[empty=true]:hidden"
        data-empty={cartItems.length === 0}
        data-loading={cartTotal.loading}
      >
        <div className="w-full relative">
          {cartTotal.loading ? (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
              <Loader2 className="animate-spin" size="40px" />
            </div>
          ) : null}
          {cartTotal.data ? (
            <div className="*:flex *:justify-between *:mb-3">
              <div>
                <span className="text-left">Subtotal</span>{" "}
                <span className="text-right text-xl">
                  ${cartTotal.data.subTotal.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-left">
                  Discount{" "}
                  <span className="text-xs">
                    ({cartTotal.data.maxDiscountPercentage}%)
                  </span>
                </span>{" "}
                <span className="text-right text-xl">
                  - ${cartTotal.data.discountedPrice}
                </span>
              </div>
              <div>
                <span className="text-left">Tax</span>{" "}
                <span className="text-right text-xl">
                  + ${cartTotal.data.tax}
                </span>
              </div>
              <div className="border-t border-b py-1">
                <span className="text-left text-2xl">You Pay</span>{" "}
                <span className="text-right text-2xl">
                  ${cartTotal.data.payable}
                </span>
              </div>
            </div>
          ) : null}
        </div>
        <Button asChild className="bg-add-to-cart w-full text-xl h-12">
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
