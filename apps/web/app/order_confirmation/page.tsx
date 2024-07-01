"use client";

import { Loader2, PackageCheck, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getOrderByIntent } from "@actions/checkout";
import useMiniCart from "@lib/store/minicart";
import SiteMap from "@utils/sitemap";

type OrderDetailsProps = {
  params: Record<string, string>;
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

export default function OrderConfirmation({
  searchParams,
}: OrderDetailsProps): JSX.Element {
  const [orderStatus, setOrderStatus] =
    useState<keyof typeof OrderConfirmationState>("loading");
  const { clearCart } = useMiniCart();
  const router = useRouter();

  useEffect(() => {
    console.log(searchParams.payment_intent, "searchParams.payment_intent");
    if (!searchParams.payment_intent) {
      setOrderStatus("failed");
      router.push(SiteMap.Home.path);
      return;
    }
    const orderConfirmation = new Promise((res, rej) => {
      let interval: number | null = null;
      const timer = setTimeout(() => {
        interval && clearInterval(interval);
        rej(new Error("FAILED"));
      }, 1000 * 10);
      interval = setInterval(() => {
        getOrderByIntent({ paymentIntent: searchParams.payment_intent }).then(
          (orderInfo) => {
            if (orderInfo.data) {
              clearTimeout(timer);
              interval && clearInterval(interval);
              res(orderInfo.data);
            }
          }
        );
      }, 2000) as unknown as number;
    });

    orderConfirmation
      .then(() => {
        setOrderStatus("success");
        clearCart();
        router.push(SiteMap.Account.Orders.path, { scroll: true });
      })
      .catch(() => {
        setOrderStatus("failed");
      });
  }, [clearCart, router, searchParams.payment_intent]);

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
