import type { Metadata } from "next";
import LoginSignup from "./LoginSignupTabView";

export default function Page() {
  return <LoginSignup />;
}

export const metadata: Metadata = {
  title: "Sign In - GridBox",
  description: "Sign in to GridBox e-commerce site",
};
