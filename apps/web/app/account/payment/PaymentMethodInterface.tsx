"use client";
import { useState } from "react";
import type Stripe from "stripe";
import CardTemplate from "./CardTemplate";

export default function PaymentMethodInterface({
  PaymentMethodList,
}: {
  PaymentMethodList: Stripe.PaymentMethod[];
}) {
  const [paymentMethods, setPaymentMethods] =
    useState<Stripe.PaymentMethod[]>(PaymentMethodList);

  const removePaymentMethod = (methodId: string) => {
    setPaymentMethods(
      paymentMethods.filter((method) => method.id !== methodId)
    );
  };

  return (
    <div className="mt-4">
      {/* <h2 className="text-xl">Cards</h2> */}
      <div className="flex flex-wrap gap-10 max-sm:justify-center">
        {PaymentMethodList.map((paymentMethod) =>
          paymentMethod.card ? (
            <CardTemplate
              CardInfo={paymentMethod.card}
              key={paymentMethod.id}
              methodId={paymentMethod.id}
              removeMethod={removePaymentMethod}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
