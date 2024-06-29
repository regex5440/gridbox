"use client";
import type Stripe from "stripe";
import CardTemplate from "./CardTemplate";

export default function PaymentMethodInterface({
  PaymentMethodList,
}: {
  PaymentMethodList: Stripe.PaymentMethod[];
}) {
  return (
    <div className="mt-4">
      {/* <h2 className="text-xl">Cards</h2> */}
      <div className="flex flex-wrap gap-10 max-md:justify-center">
        {PaymentMethodList.map((paymentMethod) =>
          paymentMethod.card ? (
            <CardTemplate
              CardInfo={paymentMethod.card}
              key={paymentMethod.id}
              methodId={paymentMethod.id}
            />
          ) : null
        )}
      </div>
    </div>
  );
}
