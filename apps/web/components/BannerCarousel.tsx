"use client";
import { Carousel } from "@repo/ui";
import { Circle } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SiteMap from "@utils/sitemap";
import { buyNowAction } from "@actions/cart";
import { discountedPrice } from "../utils";
import FormButton from "./FormButton";

export default function BannerCarousel({ products }: { products: any[] }) {
  const router = useRouter();
  const [state, action] = useFormState(buyNowAction, undefined);
  const [api, setApi] = useState<Carousel.CarouselApi | null>(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  useEffect(() => {
    api?.on("select", () => {
      setActiveSlideIndex(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (state?.error?.redirect) {
      router.push(state.error.redirect);
    } else if (state?.success?.redirect) {
      router.push(state.success.redirect);
    }
  }, [state, router]);
  const moveToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  return (
    <div>
      <Carousel.Carousel
        className="group/banner"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: false,
          }),
        ]}
        setApi={setApi}
      >
        <Carousel.CarouselContent className="h-2/3screen max-md:h-1/3screen">
          {products.map((product: any, index: number) => (
            <Carousel.CarouselItem
              className="h-full basis-full group/item select-none"
              data-active={activeSlideIndex === index}
              key={product.id}
            >
              <div className="w-full h-full relative">
                <Image
                  alt={product.title}
                  className="h-full w-full mx-auto object-cover object-center"
                  fill
                  src={product.thumbnail}
                />
                <div className="absolute left-0 bottom-0 w-full h-2/3 max-md:h-full bg-gradient-to-t flex md:items-center justify-center max-md:pb-10">
                  <div className="flex justify-between w-10/12 max-md:w-11/12 items-end text-regular-inverted">
                    <Link
                      className="transition-all group-data-[active=true]/item:animate-slideFadeLeftIn max-w-[50%] group"
                      href={`${SiteMap.PDP.path}/${product.id}`}
                    >
                      <h2 className="md:text-4xl max-md:text-lg group-hover:underline">
                        {product.title}
                      </h2>
                      <p
                        className="max-md:hidden mt-2"
                        title={product.description}
                      >
                        {product.description}
                      </p>
                    </Link>
                    <div className="grid grid-cols-2 md:min-w-60">
                      <span className="bg-alert max-md:row-start-1 max-md:col-span-2 md:rounded-full max-md:rounded-md md:text-xl font-bold text-center md:px-1.5 md:py-1 w-fit h-fit max-md:p-0.5 max-md:text-sm max-md:ml-auto">
                        - {product.discountPercentage}%
                      </span>

                      <div className="col-start-1 max-md:hidden">
                        <div className="text-xl font-light line-through">
                          ${product.price}
                        </div>
                      </div>

                      <div className="col-start-2 col-span-2 justify-self-end max-md:col-start-1">
                        <span className="mx-auto md:text-4xl text-lg font-semibold">
                          $
                          {discountedPrice(
                            product.price,
                            product.discountPercentage
                          )}
                        </span>
                      </div>
                      <form
                        action={action}
                        className="col-start-1 col-span-2 max-md:hidden overflow-hidden"
                      >
                        <input
                          hidden
                          name="productId"
                          readOnly
                          type="hidden"
                          value={product.id}
                        />
                        <input
                          hidden
                          name="quantity"
                          readOnly
                          type="hidden"
                          value="1"
                        />
                        <FormButton className="w-full mt-4 bg-buy-now text-xl text-black opacity-0 group-data-[active=true]/item:animate-[slideBottomUp_0.7s_ease-out_0.5s,fadeIn_0.6s_ease-out_0.5s_forwards]">
                          Buy Now
                        </FormButton>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.CarouselItem>
          ))}
        </Carousel.CarouselContent>
        <Carousel.CarouselPrevious
          className="bg-primary text-regular-inverted w-10 h-10 opacity-0 transition-all duration-300 md:group-hover/banner:opacity-100 md:group-hover/banner:translate-x-8 max-md:pointer-events-none max-md:invisible"
          iconProp={{ className: "w-10 h-8" }}
        />
        <Carousel.CarouselNext
          className="bg-primary text-regular-inverted dark w-10 h-10 opacity-0 transition-all duration-300 md:group-hover/banner:opacity-100 md:group-hover/banner:-translate-x-8 max-md:pointer-events-none max-md:invisible"
          iconProp={{ className: "w-10 h-8" }}
        />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {products.map((_: any, index: number) => (
            <Circle
              className="cursor-pointer stroke-secondary data-[selected=true]:fill-primary w-5 max-md:w-3"
              data-selected={activeSlideIndex === index}
              key={index}
              onClick={moveToSlide.bind(null, index)}
            />
          ))}
        </div>
      </Carousel.Carousel>
    </div>
  );
}
