"use client";
import { X } from "lucide-react";
import LoginSignup from "../../signin/page";
import { useRouter } from "next/navigation";

export default function LoginSignupModal() {
  const router = useRouter();
  return (
    <>
      <div
        className="fixed left-0 top-0 z-[19] w-[100vw] h-[100vh] bg-overlay backdrop-blur-sm"
        onClick={router.push.bind(null, "/", undefined)}
      ></div>
      <div className="fixed-centered z-20 w-full md:max-w-md max-md:bottom-0 max-md:rounded-l-2xl max-md:rounded-r-2xl">
        <div className="relative">
          <div
            className="absolute right-2 top-2 p-2 cursor-pointer"
            onClick={router.back}
          >
            <X />
          </div>
          <LoginSignup />
        </div>
      </div>
    </>
  );
}
