import Stripe from "stripe";

if (!process.env.PAYMENT_SECRET_KEY?.trim()) {
  throw new Error("Stripe key(s) not found");
}
const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY);
if (!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY?.trim()) {
  throw new Error("PUBLISHABLE key not found");
}

export default stripe;
