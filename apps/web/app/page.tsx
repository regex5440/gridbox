import React, { Suspense } from "react";
import { Product } from "@repo/ui/types";
import { BannerCarousel, ProductsCarousel } from "../components";
import RecentlyViewed from "../components/RecentlyViewed";
import { Loader } from "@repo/ui";

export default async function Page() {
  const randomSkip = Math.floor(Math.random() * 100);
  const bannerAPIResponse = await fetch(
    `${process.env.productAPI}/products?limit=7&skip=${randomSkip}`
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
  return (
    <div>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {bannerProducts && <BannerCarousel products={bannerProducts} />}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {frequentProducts && (
          <ProductsCarousel
            products={frequentProducts}
            h1="Frequently Purchased"
          />
        )}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {sunglasses && (
          <ProductsCarousel products={sunglasses} h1="Range of Sunglass" />
        )}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
}
