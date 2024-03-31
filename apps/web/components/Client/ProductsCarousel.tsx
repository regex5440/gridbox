import { Carousel, ProductTemplate } from "@repo/ui";
import { Product } from "@repo/ui/types";

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

export default function ProductsCarousel({
  h1,
  preferLocalData = false,
  products,
}: ProductCarousalProps) {
  //TODO 1: fetch the product ids from user's local storage
  //TODO 2: Use a cached fetching hook to fetch the products data
  const localProducts: Product[] = [] as any;

  return (
    <section className="md:mt-16 ml-10">
      <h1 className="text-4xl mb-6">{h1}</h1>
      <Carousel.Carousel opts={{ slidesToScroll: "auto" }}>
        <Carousel.CarouselContent>
          {(preferLocalData ? localProducts : products)?.map((product) => (
            <Carousel.CarouselItem key={product.id} className="basis-1/12">
              <ProductTemplate product={product} />
            </Carousel.CarouselItem>
          ))}
        </Carousel.CarouselContent>
        <Carousel.CarouselPrevious />
      </Carousel.Carousel>
    </section>
  );
}
