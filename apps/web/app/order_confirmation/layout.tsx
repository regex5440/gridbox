import type { Metadata } from "next";

export default function OrderConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: "Order Confirmation - GridBox",
  description:
    "Your order has been placed, awaiting confirmation, thank you for shopping with GridBox e-commerce site",
};
