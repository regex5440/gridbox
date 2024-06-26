import { Order } from "@repo/ui/types";

export const ORDER_STATUS: Record<
  Pick<Order, "status">["status"],
  { label: string; color: string }
> = {
  pending: {
    label: "Pending",
    color: "yellow",
  },
  processing: {
    label: "Processing",
    color: "green",
  },
  shipped: {
    label: "Shipped",
    color: "blue",
  },
  delivered: {
    label: "Delivered",
    color: "green",
  },
  cancelled: {
    label: "Cancelled",
    color: "red",
  },
};
