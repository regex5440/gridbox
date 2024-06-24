import { authenticateUser } from "@actions/auth";
import { Button, Input } from "@repo/ui";
import SiteMap from "@utils/sitemap";
import { getOrderByQuery, getOrdersByUser } from "controllers/order";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import OrderTemplate from "@components/OrderTemplate";
import { Order } from "@repo/ui/types";
import { NextPageProps } from "@types";
import Link from "next/link";
import ServerPagination from "@components/ServerPagination";

export default async function OrdersPage({
  params: { page },
  searchParams: { q: searchQuery, ps },
}: NextPageProps) {
  const pageSize = parseInt(ps) || 10;
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
  let orders = [];
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
            className="flex items-center gap-4"
            action={SiteMap.Account.Orders.path + "/1"}
          >
            <div className="flex items-center  w-full relative">
              <input type="hidden" name="ps" value={pageSize} readOnly hidden />
              <Input
                placeholder={"Search Orders"}
                maxLength={50}
                size={50}
                name="q"
                type="text"
                defaultValue={searchQuery}
                className="flex-1 p-0 pr-8 pl-2"
              />
              {searchQuery !== undefined && (
                <Link
                  href={SiteMap.Account.Orders.path}
                  className="absolute right-1 top-0 bottom-0 grid place-content-center text-primary h-full"
                >
                  <X />
                </Link>
              )}
            </div>
            <Button className="px-2 bg-surface-secondary">Search</Button>
          </form>
          <div className="flex flex-col gap-4 mt-4">
            {orders.map((order) => (
              <OrderTemplate order={order as Order} key={order.id} />
            ))}
          </div>
          {totalCount === 0 && (
            <p className="text-center font-semibold">No orders</p>
          )}
          <div className="mt-4">
            <ServerPagination
              currentPage={parseInt(page)}
              pageSize={pageSize}
              totalDataCount={totalCount}
              pageLink={urlForPagination}
            />
          </div>
        </>
      )}
    </div>
  );
}
