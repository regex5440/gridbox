export * from "./ui";
export { default as SiteMap } from "./sitemap";

export const getRecentlyViewedProductIds = (): string[] => {
  if (typeof window === "undefined") return [];
  const productIds = window.localStorage.viewedProductIds;
  return productIds ? JSON.parse(productIds) : [];
};

export const setRecentlyViewedProductIds = (productId: string) => {
  if (typeof window === "undefined") return;
  const currentProducts = new Set(getRecentlyViewedProductIds());
  currentProducts.add(productId);
  window.localStorage.viewedProductIds = JSON.stringify(
    Array.from(currentProducts)
  );
};
