export * from "./ui";

export const getRecentlyViewedProductIds = (): string[] => {
  if (typeof window === "undefined") return [];
  const productIds = window.localStorage.getItem("viewedProductIds");
  return productIds ? JSON.parse(productIds) : [];
};
