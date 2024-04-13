import React, { Suspense } from "react";
import { Product } from "@repo/ui/types";
import { BannerCarousel, ProductsCarousel } from "../../components";
import RecentlyViewed from "../../components/RecentlyViewed";

export default async function Page() {
  const bannerAPIResponse = await fetch(
    `${process.env.productAPI}/products?limit=7`
  )
    .then((res) => res.json())
    // .then(async (data) => {
    //   await new Promise((res) => {
    //     //TODO: Remove delay for 5 seconds
    //     setTimeout(res, 5000);
    //   });
    //   return data;
    // })
    .catch(console.error);

  const frequentlyBoughtProducts = await fetch(
    `${process.env.productAPI}/products?skip=10`
  )
    .then((res) => res.json())
    .catch(console.error);

  const sunglassesProducts = await fetch(
    `${process.env.productAPI}/products/category/sunglasses?limit=10`
  )
    .then((res) => res.json())
    .catch(console.error);

  const bannerProducts = bannerAPIResponse.products as Product[];
  const frequentProducts = frequentlyBoughtProducts.products as Product[];
  const sunglasses = sunglassesProducts.products as Product[];
  //TODO: Use Streaming for data fetching, (check if it shows loader)
  //TODO: Create a skeleton loader
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
        {sunglasses && (
          <ProductsCarousel products={sunglasses} h1="Range of Sunglass" />
        )}
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
}
