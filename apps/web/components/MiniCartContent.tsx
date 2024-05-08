"use client";
import useMiniCart from "@lib/store/minicart";
import { SidePanel } from "@repo/ui";
import { ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import CartItem from "./CartItem";
import { useEffect } from "react";

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
      <SidePanel.SheetContent className="bg-surface border-none data-[state=open]:animate-slide-right-in data-[state=closed]:animate-slide-right-out">
        <SidePanel.SheetHeader>
          <SidePanel.SheetTitle className="text-2xl">
            <Link href="/cart" className="hover:underline">
              <SidePanel.SheetClose>Cart</SidePanel.SheetClose>
            </Link>
          </SidePanel.SheetTitle>
        </SidePanel.SheetHeader>
        <div>
          {loadingCart ? (
            <p>Loading...</p>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.productId}
                productId={String(item.productId)}
                initialQty={item.quantity}
              />
            ))
          ) : (
            <p>Cart is empty</p>
          )}
        </div>
      </SidePanel.SheetContent>
    </SidePanel.Sheet>
  );
}
