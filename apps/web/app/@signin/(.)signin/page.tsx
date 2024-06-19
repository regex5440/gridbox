"use client";
import { X } from "lucide-react";
import LoginSignup from "../../signin/page";
import { useRouter } from "next/navigation";

export default function LoginSignupModal() {
  const router = useRouter();

  const routeBack = () => {
    router.back();
  };
  return [
    <div
      className="fixed left-0 top-0 z-[51] w-[100vw] h-[100vh] bg-overlay backdrop-blur-sm"
      onClick={routeBack}
    ></div>,
    <div className="fixed-centered z-[52] w-full md:max-w-md max-md:bottom-0 max-md:rounded-l-2xl max-md:rounded-r-2xl group/signin">
      <div className="relative">
        <div
          className="absolute right-2 top-2 p-2 cursor-pointer"
          onClick={routeBack}
        >
          <X />
        </div>
        <LoginSignup withinModal={true} />
      </div>
    </div>,
  ];
}
