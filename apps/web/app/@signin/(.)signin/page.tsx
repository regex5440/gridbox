"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import LoginSignup from "@app/signin/LoginSignupTabView";

export default function LoginSignupModal() {
  const router = useRouter();

  const routeBack = () => {
    router.back();
  };
  return (
    <>
      <div
        className="fixed left-0 top-0 z-[51] w-[100vw] h-[100vh] bg-overlay backdrop-blur-sm"
        onClick={routeBack}
        role="button"
        tabIndex={0}
      />
      <div className="fixed sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 max-sm:animate-slide-bottom-up max-sm:bottom-0 max-sm:left-0 max-sm:rounded-b-none z-[52] w-full md:max-w-md max-md:rounded-l-2xl max-md:rounded-r-2xl group/signin">
        <div className="relative">
          <div
            className="absolute right-2 top-2 p-2 cursor-pointer"
            onClick={routeBack}
            role="button"
            tabIndex={0}
          >
            <X />
          </div>
          <LoginSignup withinModal />
        </div>
      </div>
    </>
  );
}
