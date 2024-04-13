import { Carousel } from "@repo/ui";
import { Product } from "@repo/ui/types";
import ProductTemplateWithFetchHook from "./ProductTemplateFetchWrapper";
import { ProductTemplate } from "./ProductTemplate";

type ProductCarousalProps = {
  h1: string;
  productIds?: string[];
  products?: Product[];
} & (
  | { productIds: string[] }
  | {
      products: Product[];
    }
);

export default function ProductsCarousel({
  h1,
  productIds,
  products,
}: ProductCarousalProps) {
  const productsData = products || productIds;
  return (
    <section className="group/products md:mt-16 max-sm:mt-8 sm:ml-12">
      <h1 className="md:text-3xl max-md:text-2xl mb-6">{h1}</h1>
      {productsData?.length && (
        <Carousel.Carousel opts={{ slidesToScroll: "auto" }}>
          <Carousel.CarouselContent>
            {productsData?.map((product) => {
              const productId = (
                typeof product === "string" ? product : product.id
              ) as string;

              return (
                <Carousel.CarouselItem
                  key={productId}
                  className="max-sm:basis-[50%] max-lg:basis-[15%] basis-[10%] mx-auto"
                >
                  {typeof product === "string" ? (
                    <ProductTemplateWithFetchHook productId={productId} />
                  ) : (
                    <ProductTemplate product={product as Product} />
                  )}
                </Carousel.CarouselItem>
              );
            })}
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
      )}
    </section>
  );
}
