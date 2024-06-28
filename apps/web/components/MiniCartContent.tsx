"use client";
import { Loader, SidePanel } from "@repo/ui";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import useMiniCart from "@lib/store/minicart";
import { removeCartItem, updateCartItemQty } from "actions/cart";
import CartItem from "./CartItem";

export default function MiniCart() {
  const { open, toggle, loadingCart, cartItems, fetchCart } = useMiniCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  return (
    <SidePanel.Sheet onOpenChange={toggle} open={open}>
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
      <SidePanel.SheetContent className="bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out group minicart p-0 flex flex-col">
        <SidePanel.SheetHeader className="px-6 pt-6">
          <SidePanel.SheetTitle className="text-2xl mb-3">
            <Link className="hover:underline" href="/cart">
              <SidePanel.SheetClose>Cart</SidePanel.SheetClose>
            </Link>
          </SidePanel.SheetTitle>
        </SidePanel.SheetHeader>
        <div className="overflow-y-auto relative px-6 thin-scrollbar">
          <div className="pb-12">
            {loadingCart ? (
              <Loader className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            ) : null}
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  className="mb-1"
                  initialQty={item.quantity}
                  key={item.productId}
                  onQtyChange={(qty, productId) => {
                    updateCartItemQty({ productId, quantity: qty }).then(
                      fetchCart
                    );
                  }}
                  onRemove={(productId) => {
                    removeCartItem(productId).then(fetchCart);
                  }}
                  productId={String(item.productId)}
                />
              ))
            ) : (
              <p>Cart is empty</p>
            )}
          </div>
        </div>
        {cartItems.length > 0 && (
          <SidePanel.SheetFooter className="absolute bottom-0 left-0 w-full">
            <Link
              className="bg-add-to-cart text-regular-inverted w-full text-center py-2 text-xl"
              href="/checkout"
            >
              <SidePanel.SheetClose className="w-full h-full text-center">
                Checkout
              </SidePanel.SheetClose>
            </Link>
          </SidePanel.SheetFooter>
        )}
      </SidePanel.SheetContent>
    </SidePanel.Sheet>
  );
}
