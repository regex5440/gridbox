"use client";
import { Loader } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import SiteMap from "@utils/sitemap";

export default function RedirectOrders() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`${SiteMap.Account.Orders.path}/1?ps=10`);
  }, [router]);
  return <Loader className="grid h-full w-full place-content-center" />;
}
