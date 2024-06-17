import { authenticateUser } from "@actions/auth";
import FormButton from "@components/FormButton";
import { Input } from "@repo/ui";
import SiteMap from "@utils/sitemap";
import { getOrdersByUser } from "controllers/order";
import { Search } from "lucide-react";
import { redirect } from "next/navigation";
import { Pagination as Pg, Select as Sel } from "@repo/ui";
import OrderTemplate from "@components/OrderTemplate";
import { Order } from "@repo/ui/types";

const {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} = Pg;
const {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} = Sel;

export default async function OrdersPage() {
  const authenticUser = await authenticateUser();
  if (!authenticUser.success) {
    return redirect(
      `${SiteMap.Signin.path}?redirect=${SiteMap.Account.Orders.path}`
    );
  }
  const orders = await getOrdersByUser(authenticUser.data?.id);

  return (
    <div className="px-4 max-lg:py-4">
      <h1 className="text-2xl semibold max-lg:hidden">Your Orders</h1>
      {orders.data.length === 0 && (
        <p className="text-center font-semibold">No orders</p>
      )}
      {orders.data.length > 0 && [
        <form className="flex items-center gap-4">
          <div className="relative w-full">
            <Input placeholder={"Search Orders"} />
            <div className="absolute right-0 bottom-0 top-0 h-full">
              <Select>
                <SelectTrigger className="h-full">
                  <SelectValue>Filter</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={"no"}>
                      <SelectLabel>No Filter</SelectLabel>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <FormButton className="px-2 bg-surface-secondary">Search</FormButton>
        </form>,
        <div className="flex flex-col gap-4 mt-4">
          {orders.data.map((order) => (
            <OrderTemplate order={order as Order} key={order.id} />
          ))}
        </div>,
        <Pagination>
          <PaginationContent>
            <PaginationPrevious href="#" />
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationNext href="#" />
          </PaginationContent>
        </Pagination>,
      ]}
    </div>
  );
}
