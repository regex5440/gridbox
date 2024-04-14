"use client";

import { usePathname, useRouter } from "next/navigation";
import { NextPageProps } from "../../../@types";

export default function CategoryPageRedirect({
  params: { category },
}: NextPageProps) {
  const path = usePathname();
  const router = useRouter();
  router.push(`${path}/1`);
  return <div>Loading...</div>;
}
