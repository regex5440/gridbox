import { Suspense } from "react";
import ProductImageSection from "./ProductImageViewer";
import { ProductsCarousel } from "../../../components";
import RecentlyViewed from "../../../components/RecentlyViewed";
import { Star, StarHalf } from "lucide-react";
import { Button } from "@repo/ui";
import QtySelector from "../../../components/QtySelector";
import ProductVisitedMarker from "../../../components/ProductVisitedMarker";

type ProductPageProps = {
  params: {
    product_id: string;
  };
  searchParams: URLSearchParams;
};

export default async function ProductPage({
  params: { product_id },
}: ProductPageProps) {
  const productDetails = await fetch(
    `${process.env.productAPI}/products/${product_id}`
  ).then((res) => res.json());

  const relatedProducts = await fetch(
    `${process.env.productAPI}/products/category/${productDetails.category}?limit=10`
  ).then((res) => res.json());

  const ratingStarCount = Math.ceil(productDetails.rating);
  return (
    <>
      <ProductVisitedMarker product_id={product_id} />
      <div className="px-common-x">
        <section className="mx-auto w-full lg:max-w-[80%] md:flex gap-8 justify-evenly mt-10 max-md:flex-wrap">
          <ProductImageSection product={productDetails} />
          <div className="sm:min-w-80 sm:max-w-[25%] flex flex-col w-full max-md:mt-10 sm:max-lg:mx-auto">
            <h1 className="text-3xl">{productDetails.title}</h1>
            <p className="text-sm">by {productDetails.brand}</p>
            <p
              className="flex gap-1 mt-1 items-center"
              title={productDetails.rating.toFixed(1)}
            >
              {new Array(ratingStarCount).fill(0).map((_, i) => {
                if (
                  i === ratingStarCount - 1 &&
                  productDetails.rating % 10 > 0
                ) {
                  return (
                    <span key={i}>
                      <StarHalf
                        size={18}
                        className="fill-star-color stroke-star-color"
                      />
                    </span>
                  );
                }
                return (
                  <span key={i}>
                    <Star
                      size={18}
                      className="fill-star-color stroke-star-color"
                    />
                  </span>
                );
              })}
              ({productDetails.rating.toFixed(1)})
            </p>
            <p className="mt-4">
              <span className="line-through">Rs. {productDetails.price}</span>{" "}
              <span className="ml-4">
                {productDetails.discountPercentage}% OFF
              </span>
            </p>
            <p className="mt-1 flex justify-between items-baseline">
              <span className="text-2xl ">
                ${" "}
                {(
                  productDetails.price -
                  (productDetails.price * productDetails.discountPercentage) /
                    100
                ).toFixed(2)}
              </span>
              {productDetails.stock > 5 ? (
                <span className="text-green-200">In Stock</span>
              ) : productDetails.stock > 0 ? (
                <span className="text-yellow-200">Limited Stock</span>
              ) : (
                <span className="text-red-200">Out of Stock</span>
              )}
            </p>
            <div className="mt-auto text-center">
              <form className="text-center">
                <div className="flex gap-4 items-end">
                  <QtySelector />
                  <Button className="bg-buy-now text-white p-2 rounded-md mt-4 w-full">
                    Buy Now
                  </Button>
                </div>
                <Button className="bg-add-to-cart text-white p-2 rounded-md mt-4 w-full">
                  Add to Cart
                </Button>
              </form>
              <p className="my-2 fieldset-legend">OR</p>
              <Button className="border rounded-lg w-8/12">
                Add to Wishlist
              </Button>
            </div>
          </div>
        </section>
        <section className="mt-16">
          <fieldset className="border p-4 sm:pl-12 rounded-lg">
            <legend>
              <h2 className="text-3xl">Product Details</h2>
            </legend>
            <p className="mt-4">Description: {productDetails.description}</p>
          </fieldset>
        </section>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductsCarousel
            h1="Related Items"
            products={relatedProducts.products}
          />
        </Suspense>

        <RecentlyViewed />
      </div>
    </>
  );
}
