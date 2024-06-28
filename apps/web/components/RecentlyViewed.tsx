"use client";
import { Carousel } from "@repo/ui";
import { useEffect, useState } from "react";
import { getRecentlyViewedProductIds } from "../utils";
import ProductTemplateWithFetchHook from "./ProductTemplateFetchWrapper";

export default function RecentlyViewed() {
  const [productIds, setProductIds] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    const pIds = getRecentlyViewedProductIds() || [];
    setProductIds(pIds);
  }, []);

  return (
    <section className="md:mt-16 max-md:mt-8 sm:ml-12">
      <h1 className="md:text-3xl max-md:text-2xl mb-6">Recently Viewed</h1>
      {productIds?.length ? (
        <Carousel.Carousel opts={{ slidesToScroll: "auto" }}>
          <Carousel.CarouselContent>
            {productIds.map((productId, index) => (
              <Carousel.CarouselItem
                className={`max-sm:basis-[50%] max-lg:basis-[15%] basis-[10%] ${index === 0 ? "ml-auto" : ""} ${index === productIds.length - 1 ? "mr-auto" : ""}`}
                key={`rv${productId}`}
              >
                <ProductTemplateWithFetchHook productId={productId} />
              </Carousel.CarouselItem>
            ))}
          </Carousel.CarouselContent>
          <Carousel.CarouselPrevious
            className="bg-arrow-color -translate-x-full w-10 h-10 [&:disabled]:hidden hide-mobile-view"
            iconProp={{ className: "w-7 h-7" }}
          />
          <Carousel.CarouselNext
            className="bg-arrow-color -translate-x-4 w-10 h-10 [&:disabled]:hidden hide-mobile-view"
            iconProp={{ className: "w-7 h-7" }}
          />
        </Carousel.Carousel>
      ) : (
        <div className="text-center text-xl">No Products Viewed!</div>
      )}
    </section>
  );
}
