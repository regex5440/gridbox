import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Card - GridBox",
  description:
    "Your cart, your items, your choice, your GridBox, your way, cart page of GridBox e-commerce site ",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
