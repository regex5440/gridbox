import React, { Suspense } from "react";
import type { Product } from "@repo/ui/types";
import { Loader } from "@repo/ui";
import { BannerCarousel, ProductsCarousel } from "../components";
import RecentlyViewed from "../components/RecentlyViewed";

export default async function Page() {
  const randomSkip = Math.floor(Math.random() * 100);
  const bannerAPIResponse = (await fetch(
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
    .catch()) as { products: Product[] } | null;

  const frequentlyBoughtProducts = (await fetch(
    `${process.env.productAPI}/products?skip=10`
  )
    .then((res) => res.json())
    .catch()) as { products: Product[] } | null;

  const sunglassesProducts = (await fetch(
    `${process.env.productAPI}/products/category/sunglasses?limit=10`
  )
    .then((res) => res.json())
    .catch()) as { products: Product[] } | null;

  const bannerProducts = bannerAPIResponse?.products;
  const frequentProducts = frequentlyBoughtProducts?.products;
  const sunglasses = sunglassesProducts?.products;
  return (
    <div>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {bannerProducts ? <BannerCarousel products={bannerProducts} /> : null}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {frequentProducts ? (
          <ProductsCarousel
            h1="Frequently Purchased"
            products={frequentProducts}
          />
        ) : null}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        {sunglasses ? (
          <ProductsCarousel h1="Range of Sunglass" products={sunglasses} />
        ) : null}
      </Suspense>
      <Suspense fallback={<Loader className="mx-auto mt-6" />}>
        <RecentlyViewed />
      </Suspense>
    </div>
  );
}
