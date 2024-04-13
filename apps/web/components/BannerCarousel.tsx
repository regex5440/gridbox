"use client";
import { Button, Carousel } from "@repo/ui";
import { Circle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import { discountedPrice } from "../utils";

export default function BannerCarousel({ products }: { products: any[] }) {
  const [api, setApi] = useState<Carousel.CarouselApi | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    api?.on("select", () => {
      setActiveSlideIndex(api?.selectedScrollSnap());
    });
  }, [api]);
  const moveToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div>
      <Carousel.Carousel
        opts={{ loop: true }}
        className="group/banner"
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <Carousel.CarouselContent className="h-2/3screen max-md:h-1/3screen">
          {products?.map((product: any, index: number) => (
            <Carousel.CarouselItem
              key={product.id}
              className="h-full basis-full group/item"
              data-active={activeSlideIndex === index}
            >
              <div className={`w-full h-full relative`}>
                <img
                  src={product.thumbnail}
                  className="h-full w-full mx-auto"
                />
                <div className="absolute left-0 bottom-0 w-full h-2/3 max-md:h-full bg-gradient-to-t flex items-center justify-center">
                  <div className="flex justify-between w-10/12 items-end">
                    <div className="transition-all group-data-[active=true]/item:animate-slideFadeLeftIn max-w-[50%]">
                      <h2 className="md:text-4xl max-md:text-2xl">
                        {product.title}
                      </h2>
                      <p title={product.description} className="max-md:hidden">
                        {product.description}
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <span className="bg-red-500 max-md:row-start-1 max-md:col-span-2 md:rounded-full max-md:rounded-md md:text-xl font-bold text-center p-2 w-fit h-fit max-md:p-1 max-md:text-sm max-md:ml-auto">
                        {product.discountPercentage}% Off
                      </span>

                      <div className="col-start-1 max-md:hidden">
                        <div className="text-2xl font-extralight">
                          <sup>$ </sup>
                          <span className="line-through">{product.price}</span>
                        </div>
                      </div>

                      <div className="col-start-2 col-span-2 justify-self-end max-md:col-start-1">
                        <span className="mx-auto md:text-4xl text-2xl font-extralight">
                          $
                          {discountedPrice(
                            product.price,
                            product.discountPercentage
                          )}
                        </span>
                      </div>
                      <Button className="col-start-1 col-span-2 w-full mt-4 bg-buy-now text-xl text-black">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.CarouselItem>
          ))}
        </Carousel.CarouselContent>
        <Carousel.CarouselPrevious
          iconProp={{ className: "w-10 h-10" }}
          className="bg-arrow-color w-12 h-12 opacity-0 transition-all duration-300 md:group-hover/banner:opacity-100 md:group-hover/banner:translate-x-8 max-md:pointer-events-none"
        />
        <Carousel.CarouselNext
          iconProp={{ className: "w-10 h-10" }}
          className="bg-arrow-color dark w-12 h-12 opacity-0 transition-all duration-300 md:group-hover/banner:opacity-100 md:group-hover/banner:-translate-x-8 max-md:pointer-events-none"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {products?.map((_: any, index: number) => (
            <Circle
              key={index}
              className="cursor-pointer data-[selected=true]:fill-dot-bg w-5 max-md:w-3"
              data-selected={activeSlideIndex === index}
              onClick={moveToSlide.bind(null, index)}
            />
          ))}
        </div>
      </Carousel.Carousel>
    </div>
  );
}
