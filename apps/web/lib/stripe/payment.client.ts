"use client";
import { loadStripe } from "@stripe/stripe-js";

if (!process.env.NEXT_PUBLIC_PUBLISHABLE_KEY?.trim()) {
  throw new Error("Stripe key(s) not found");
}

export const stripeClient = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY);
