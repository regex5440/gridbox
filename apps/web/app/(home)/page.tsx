"use client";
import { Carousel } from "@repo/ui";
import { Circle } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [api, setApi] = useState<Carousel.CarouselApi | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch("/api/products/banner")
        .then((res) => res.json())
        .catch(console.error);
      setProducts(response.data);
    })();
  }, []);

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
      >
        <Carousel.CarouselContent className="h-2/3screen">
          {products?.map((product: any) => (
            <Carousel.CarouselItem key={product.id} className="h-full pl-0">
              <div className="w-full h-full bg-red-200">
                <img
                  src={product.thumbnail}
                  className="h-full w-full mx-auto"
                />
              </div>
            </Carousel.CarouselItem>
          ))}
        </Carousel.CarouselContent>
        <Carousel.CarouselPrevious
          iconProp={{ className: "w-10 h-10" }}
          className="bg-arrow-color w-12 h-12 opacity-0 transition-all duration-300 group-hover/banner:opacity-100 group-hover/banner:translate-x-8"
        />
        <Carousel.CarouselNext
          iconProp={{ className: "w-10 h-10" }}
          className="bg-arrow-color dark w-12 h-12 opacity-0 transition-all duration-300 group-hover/banner:opacity-100 group-hover/banner:-translate-x-8"
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {products?.map((_: any, index: number) => (
            <Circle
              key={index}
              className="cursor-pointer data-[selected=true]:fill-dot-bg"
              data-selected={activeSlideIndex === index}
              size={20}
              onClick={moveToSlide.bind(null, index)}
            />
          ))}
        </div>
      </Carousel.Carousel>
    </div>
  );
}
