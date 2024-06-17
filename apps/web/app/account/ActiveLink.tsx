"use client";

import SiteMap from "@utils/sitemap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function () {
  const pathName = usePathname();

  return (
    <div className="flex lg:flex-col lg:gap-4 max-lg:*:flex-grow max-lg:*:text-center lg:border-r-4 lg:pr-10 border-primary *:transition-colors *:duration-500 max-lg:bg-surface text-ternary text-xl *:overflow-x-hidden *:relative before:*:absolute before:*:bottom-0 before:*:left-0 before:*:h-1 before:*:w-full before:*:scale-x-0 before:*:transition-transform duration-800 before:*:origin-right before:*:rounded before:*:bg-primary data-[current=true]:*:font-semibold data-[current=true]:before:*:origin-left lg:data-[current=true]:before:*:scale-x-100 lg:data-[current=true]:*:text-primary max-lg:data-[current=true]:*:bg-primary max-lg:data-[current=true]:*:text-white max-lg:justify-between max-lg:border-b-2 max-lg:*:pb-1 *:pt-1 max-lg:pt-2 sticky max-lg:top-12 z-10 max-lg:px-1">
      <Link
        href={SiteMap.Account.Profile.path}
        data-current={pathName.endsWith(SiteMap.Account.Profile.path)}
      >
        Profile
      </Link>
      <Link
        href={SiteMap.Account.Orders.path}
        data-current={pathName.endsWith(SiteMap.Account.Orders.path)}
      >
        Orders
      </Link>
      <Link
        href={SiteMap.Account.Addresses.path}
        data-current={pathName.endsWith(SiteMap.Account.Addresses.path)}
      >
        Address<span className="hidden lg:inline"> Book</span>
      </Link>
      <Link
        href={SiteMap.Account.Payment.path}
        data-current={pathName.endsWith(SiteMap.Account.Payment.path)}
      >
        Payment
      </Link>
    </div>
  );
}
