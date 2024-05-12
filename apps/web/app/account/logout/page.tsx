"use client";
import useMiniCart from "@lib/store/minicart";
import useUserStore from "@lib/store/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Logout() {
  const { removeUser } = useUserStore();
  const { clearCart } = useMiniCart();
  const router = useRouter();

  useEffect(() => {
    removeUser();
    clearCart();
    fetch("/api/account/logout");
    router.push("/");
  }, []);

  return null;
}
