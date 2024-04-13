export * from "./ui";
export * from "./sitemap";
export * from "./enums";
export * from "./sitemap";

export const getRecentlyViewedProductIds = (): string[] => {
  if (typeof window === "undefined") return [];
  const productIds = window.localStorage.viewedProductIds;
  return productIds ? JSON.parse(productIds) : [];
};

export const setRecentlyViewedProductIds = (productId: string) => {
  if (typeof window === "undefined") return;
  const currentProducts = new Set(getRecentlyViewedProductIds().toReversed());
  currentProducts.add(productId);
  window.localStorage.viewedProductIds = JSON.stringify(
    Array.from(currentProducts).toReversed()
  );
};
