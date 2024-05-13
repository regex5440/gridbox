"use client";
import useMiniCart from "@lib/store/minicart";
import { Button, SidePanel } from "@repo/ui";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";
import { useEffect } from "react";
import { removeCartItem, updateCartItemQty } from "actions/cart";

export default function MiniCart() {
  const { open, toggle, loadingCart, cartItems, fetchCart } = useMiniCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <SidePanel.Sheet open={open} onOpenChange={toggle}>
      <SidePanel.SheetTrigger asChild className="px-3 cursor-pointer relative">
        <div>
          <ShoppingCartIcon />
          {cartItems.length > 0 && (
            <div className="absolute bottom-0 translate-y-[50%] right-1 bg-surface-inverted text-regular-inverted font-semibold z-[1] text-xs rounded-[50%] h-5 aspect-square flex justify-center items-center">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
            </div>
          )}
        </div>
      </SidePanel.SheetTrigger>
      <SidePanel.SheetContent className="bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out group minicart">
        <SidePanel.SheetHeader>
          <SidePanel.SheetTitle className="text-2xl mb-3">
            <Link href="/cart" className="hover:underline">
              <SidePanel.SheetClose>Cart</SidePanel.SheetClose>
            </Link>
          </SidePanel.SheetTitle>
        </SidePanel.SheetHeader>
        <div className="overflow-y-auto max-h-full">
          {loadingCart ? (
            <p>Loading...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.productId}
                productId={String(item.productId)}
                initialQty={item.quantity}
                onQtyChange={(qty, productId) => {
                  updateCartItemQty({ productId, quantity: qty }).then(
                    fetchCart
                  );
                }}
                onRemove={(productId) => {
                  removeCartItem(productId).then(fetchCart);
                }}
                className="mb-1"
              />
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
        {cartItems?.length > 0 && (
          <SidePanel.SheetFooter className="absolute bottom-0 left-0 w-full">
            <Link
              href="/checkout"
              className="bg-add-to-cart text-regular-inverted w-full text-center py-2 text-xl"
            >
              Checkout
            </Link>
          </SidePanel.SheetFooter>
        )}
      </SidePanel.SheetContent>
    </SidePanel.Sheet>
  );
}
