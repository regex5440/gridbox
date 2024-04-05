import React, { Suspense } from "react";
import { Product } from "@repo/ui/types";
import { BannerCarousel, ProductsCarousel } from "../../components";
import RecentlyViewed from "../../components/Client/RecentlyViewed";

export default async function Page() {
  const bannerAPIResponse = await fetch(
    "https://dummyjson.com/products?limit=7"
  )
    .then((res) => res.json())
    .then(async (data) => {
      await new Promise((res) => {
        setTimeout(res, 5000);
      });
      return data;
    })
    .catch(console.error);

  const frequentlyBoughtProducts = await fetch(
    "https://dummyjson.com/products?skip=10"
  )
    .then((res) => res.json())
    .catch(console.error);

  const bannerProducts = bannerAPIResponse.products as Product[];
  const frequentProducts = frequentlyBoughtProducts.products as Product[];
  //TODO 2: Use Streaming for data fetching, (check if it shows loader)
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        {bannerProducts && <BannerCarousel products={bannerProducts} />}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        {frequentProducts && (
          <ProductsCarousel
            products={frequentProducts}
            h1="Frequently Purchased"
          />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
}
