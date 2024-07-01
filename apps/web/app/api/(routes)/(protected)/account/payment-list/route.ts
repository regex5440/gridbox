import { NextResponse } from "next/server";
import { getAuthenticateUser } from "@actions/auth";
import { getPaymentMethods } from "@actions/checkout";

export const GET = async () => {
  const authenticatedUser = await getAuthenticateUser();
  if (!authenticatedUser.success) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!authenticatedUser.data.stripeCustomerId) {
    return NextResponse.json(
      { message: "Stripe customer not found" },
      { status: 404 }
    );
  }

  const paymentMethods = await getPaymentMethods(
    authenticatedUser.data.stripeCustomerId
  );

  return NextResponse.json({ data: paymentMethods.data });
};
