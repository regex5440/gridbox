"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useMiniCart from "@lib/store/minicart";
import useUserStore from "@lib/store/user";

export default function Logout() {
  const { removeUser } = useUserStore();
  const { clearCart } = useMiniCart();
  const router = useRouter();

  useEffect(() => {
    removeUser();
    clearCart();
    fetch("/api/account/logout")
      .then(() => {})
      .catch(() => {})
      .finally(() => {
        router.push("/");
      });
  }, [router, removeUser, clearCart]);

  return null;
}
