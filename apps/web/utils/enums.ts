import { Order } from "@repo/ui/types";

export const Category = {
  ALL: "all",
  SMARTPHONE: "smartphones",
  LAPTOPS: "laptops",
  SKINCARE: "skincare",
  FURNITURE: "furniture",
  "HOME DECORATION": "home-decoration",
  TOPS: "tops",
  MEN: {
    SHIRTS: "mens-shirts",
    SHOES: "mens-shoes",
    WATCHES: "mens-watches",
  },
  WOMEN: {
    DRESSES: "womens-dresses",
    SHOES: "womens-shoes",
    BAGS: "womens-bags",
    JEWELRY: "womens-jewellery",
    WATCHES: "womens-watches",
  },
  LIGHTNING: "lighting",
  AUTOMOTIVE: "automotive",
  SUNGLASSES: "sunglasses",
  GROCERIES: "groceries",
  FRAGRANCES: "fragrances",
  MOTORCYCLE: "motorcycle",
};

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
