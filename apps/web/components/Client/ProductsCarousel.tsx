import { Carousel, ProductTemplate } from "@repo/ui";
import { Product } from "@repo/ui/types";
import { getRecentlyViewedProductIds } from "../../utils";

type ProductCarousalProps = {
  h1: string;
  preferLocalData?: boolean;
  products?: Product[];
} & (
  | { preferLocalData: true }
  | {
      preferLocalData: false;
      products: Product[];
    }
);

const ProductTemplateWithFetchHook = ({ productId }: { productId: string }) => {
  //TODO: Use SWR hook to fetch product data
  const { data, isFetching } = useProductFetch(productId);
  return <ProductTemplate product={data} showLoader={isFetching} />;
};

export default function ProductsCarousel({
  h1,
  preferLocalData = false,
  products,
}: ProductCarousalProps) {
  const productIds = preferLocalData ? getRecentlyViewedProductIds() : [];

  return (
    <section className="md:mt-16 ml-10">
      <h1 className="text-4xl mb-6">{h1}</h1>
      <Carousel.Carousel opts={{ slidesToScroll: "auto" }}>
        <Carousel.CarouselContent>
          {(preferLocalData ? productIds : products)?.map((product) => {
            const productId = (
              typeof product === "string" ? product : product.id
            ) as string;

            return (
              <Carousel.CarouselItem key={productId} className="basis-1/12">
                {preferLocalData ? (
                  <ProductTemplateWithFetchHook productId={productId} />
                ) : (
                  <ProductTemplate product={product as Product} />
                )}
              </Carousel.CarouselItem>
            );
          })}
        </Carousel.CarouselContent>
        <Carousel.CarouselNext />
        <Carousel.CarouselPrevious />
      </Carousel.Carousel>
    </section>
  );
}
