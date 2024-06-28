import { Metadata } from "next";
import LoginSignup from "./LoginSignupTabView";
import { getAuthenticateUser } from "@actions/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const authenticUser = await getAuthenticateUser();
  if (authenticUser.success) {
    return redirect("/");
  }
  return <LoginSignup />;
}

export const metadata: Metadata = {
  title: "Sign In - GridBox",
  description: "Sign in to GridBox e-commerce site",
};
