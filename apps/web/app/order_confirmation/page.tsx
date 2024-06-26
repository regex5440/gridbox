"use client";

import { getOrderByIntent } from "@actions/checkout";
import useMiniCart from "@lib/store/minicart";
import SiteMap from "@utils/sitemap";
import { Loader2, PackageCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OrderDetailsProps = {
  params: {
    [key: string]: string;
  };
  searchParams: {
    payment_intent: string;
    payment_intent_client_secret: string;
    redirect_status: string;
  };
};

const OrderConfirmationState = {
  loading: (
    <div className="flex gap-2">
      <Loader2 className="animate-spin" /> Confirming your order status...
    </div>
  ),
  success: (
    <div className="flex flex-col items-center">
      <PackageCheck size={50} />
      <div className="text-xl">Order confirmed!</div>
      <div>Redirecting to your orders...</div>
    </div>
  ),
  failed: (
    <div className="flex flex-col items-center text-alert">
      <X size={50} />
      <div className="text-xl">Order failed!</div>
      <div className="text-regular max-w-xl mt-2">
        Unfortunately, we were unable to create the order. Any amount deducted
        will be refunded within 7-10 business days...
      </div>
    </div>
  ),
};

export default function OrderConfirmation({ searchParams }: OrderDetailsProps) {
  const [orderStatus, setOrderStatus] =
    useState<keyof typeof OrderConfirmationState>("loading");
  const { clearCart } = useMiniCart();
  const router = useRouter();

  useEffect(() => {
    if (!searchParams.payment_intent) {
      setOrderStatus("failed");
      router.push(SiteMap.Home.path);
      return;
    }
    const timer = setTimeout(() => {
      setOrderStatus("failed");
    }, 8000);

    getOrderByIntent({ paymentIntent: searchParams.payment_intent }).then(
      (res) => {
        clearTimeout(timer);
        if (res.error) {
          setOrderStatus("failed");
        } else if (res.data) {
          setOrderStatus("success");
          clearCart();
          setTimeout(router.push, 3000, SiteMap.Account.Orders.path);
        }
      }
    );

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-10/12 max-w-screen-lg mx-auto mt-4 h-[40vh]">
      <h1 className="text-xl md:text-2xl semibold">Order Confirmation</h1>
      <div className="h-full">
        <div className="flex justify-center h-full items-center flex-col">
          {orderStatus === "loading" && (
            <p className="text-center mb-4 text-xl">
              Thank you for your order!
            </p>
          )}
          {OrderConfirmationState[orderStatus]}
        </div>
      </div>
    </div>
  );
}
