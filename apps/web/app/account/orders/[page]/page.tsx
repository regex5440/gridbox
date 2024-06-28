import { Button, Input } from "@repo/ui";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import type { Order } from "@repo/ui/types";
import Link from "next/link";
import OrderTemplate from "@components/OrderTemplate";
import { getOrderByQuery, getOrdersByUser } from "controllers/order";
import SiteMap from "@utils/sitemap";
import { authenticateUser } from "@actions/auth";
import ServerPagination from "@components/ServerPagination";
import { Metadata } from "next";

type OrdersPageProps = {
  params: { page: string };
  searchParams: { q?: string; ps?: string };
};

export default async function OrdersPage({
  params: { page },
  searchParams: { q: searchQuery, ps },
}: OrdersPageProps) {
  const pageSize = ps ? parseInt(ps) : 10;
  const queryParams = new URLSearchParams();
  if (searchQuery !== undefined) {
    queryParams.append("q", searchQuery);
  }
  queryParams.append("ps", pageSize.toString());
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return redirect(
      `${SiteMap.Signin.path}?redirect=${SiteMap.Account.Orders.path}?${queryParams.toString()}`
    );
  }
  let orders: Order[] = [];
  let totalCount = 0;
  if (searchQuery) {
    const { data, total } = await getOrderByQuery({
      query: searchQuery,
      userId: authenticUser.data.id,
      offset: (parseInt(page) - 1) * pageSize,
      ps: pageSize,
    });
    totalCount = total;
    orders = data;
  } else {
    const { data, total } = await getOrdersByUser({
      userId: authenticUser.data.id,
      offset: (parseInt(page) - 1) * pageSize,
      ps: pageSize,
    });
    orders = data;
    totalCount = total;
  }
  const urlForPagination = new URL(
    SiteMap.Account.Orders.path,
    process.env.ASSIGNED_URL
  );
  queryParams.forEach((value, key) => {
    urlForPagination.searchParams.set(key, value);
  });
  return (
    <div className="px-1">
      <h1 className="text-2xl semibold max-lg:hidden">Your Orders</h1>
      {(totalCount > 0 || searchQuery !== undefined) && (
        <>
          <form
            action={`${SiteMap.Account.Orders.path}/1`}
            className="flex items-center gap-4"
          >
            <div className="flex items-center  w-full relative">
              <input hidden name="ps" readOnly type="hidden" value={pageSize} />
              <Input
                className="flex-1 p-0 pr-8 pl-2"
                defaultValue={searchQuery}
                maxLength={50}
                name="q"
                placeholder="Search Orders"
                size={50}
                type="text"
              />
              {searchQuery !== undefined && (
                <Link
                  className="absolute right-1 top-0 bottom-0 grid place-content-center text-primary h-full"
                  href={SiteMap.Account.Orders.path}
                >
                  <X />
                </Link>
              )}
            </div>
            <Button className="px-2 bg-surface-secondary">Search</Button>
          </form>
          <div className="flex flex-col gap-4 mt-4">
            {orders.map((order) => (
              <OrderTemplate key={order.id} order={order} />
            ))}
          </div>
          {totalCount === 0 && (
            <p className="text-center font-semibold">No orders</p>
          )}
          <div className="mt-4">
            <ServerPagination
              currentPage={parseInt(page)}
              pageLink={urlForPagination}
              pageSize={pageSize}
              totalDataCount={totalCount}
            />
          </div>
        </>
      )}
    </div>
  );
}

export const metadata: Metadata = {
  title: "Account/Orders - GridBox",
  description: "View your orders on GridBox e-commerce site",
};
