import { Suspense } from "react";
import {
  CircleCheckBig,
  Info,
  RefreshCcw,
  RefreshCwOff,
  ShieldCheck,
} from "lucide-react";
import type { Product } from "@repo/ui/types";
import Link from "next/link";
import { Loader } from "@repo/ui";
import ProductPurchaseForm from "@app/product_description/[productId]/ProductPurchaseForm";
import ProductVisitedMarker from "@components/ProductVisitedMarker";
import RecentlyViewed from "@components/RecentlyViewed";
import { ProductsCarousel, StarRatings } from "@components/index";
import ProductImageSection from "./ProductImageViewer";
import { Metadata } from "next";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: {
    productId: string;
  };
  searchParams: URLSearchParams;
};

export default async function ProductPage({
  params: { productId },
}: ProductPageProps) {
  const productDetails = await fetch(
    `${process.env.productAPI}/products/${productId}`
  ).then<Product>((res) => res.json());

  if (!productDetails.id) return notFound();

  const relatedProducts = (await fetch(
    `${process.env.productAPI}/products/category/${productDetails.category}?limit=10`
  ).then((res) => res.json())) as { products: Product[] };

  const visibleStarRating = String(productDetails.rating).substring(0, 3);
  const productPrice =
    productDetails.price -
    (productDetails.price * productDetails.discountPercentage) / 100;
  return (
    <>
      <ProductVisitedMarker productId={productId} />
      <div className="px-common-x">
        <section className="mx-auto w-full lg:max-w-[80%] sm:flex gap-8 justify-evenly mt-10 max-sm:flex-wrap">
          <div className="sm:sticky top-16 h-fit">
            <ProductImageSection product={productDetails} />
          </div>
          <div className="sm:min-w-80 sm:max-w-[30%] flex flex-col w-full max-sm:mt-10 sm:max-lg:mx-auto">
            <h1 className="text-3xl">{productDetails.title}</h1>
            {productDetails.brand ? (
              <p className="text-sm">by {productDetails.brand}</p>
            ) : null}
            <p className="text-xs flex gap-2 overflow-x-auto mt-2">
              {productDetails.tags.map((label: string, i) => (
                <span
                  className="bg-surface-secondary px-1.5 py-0.5 rounded-full"
                  key={`tag${i}`}
                >
                  {label}
                </span>
              ))}
            </p>
            <Link href="#reviews" title={visibleStarRating}>
              <StarRatings rating={productDetails.rating} /> (
              {visibleStarRating})
            </Link>
            <p className="mt-1">
              <span className="line-through">$ {productDetails.price}</span>{" "}
              <span className="ml-2">
                {productDetails.discountPercentage}% OFF
              </span>
            </p>
            <p className="mt-1 flex justify-between items-baseline">
              <span className="text-2xl ">$ {productPrice.toFixed(2)}</span>
              {productDetails.stock > 5 ? (
                <span className="text-green-500">In Stock</span>
              ) : productDetails.stock > 0 ? (
                <span className="text-yellow-500">Limited Stock</span>
              ) : (
                <span className="text-red-500">Out of Stock</span>
              )}
            </p>
            {productDetails.shippingInformation ? (
              <p className="text-sm flex items-center gap-1 mt-1 font-semibold">
                {/* <span className="font-bold">Shipping:</span>{" "} */}
                {/month/gi.test(productDetails.shippingInformation) ? (
                  <Info className="text-yellow-500" size={16} />
                ) : (
                  <CircleCheckBig className="text-green-500" size={16} />
                )}{" "}
                {productDetails.shippingInformation}
              </p>
            ) : null}
            <div className="mt-14 text-center">
              <ProductPurchaseForm productId={productId} />
              {/* //TODO: Add wishlist button in the image area */}
              {/* <p className="my-2 fieldset-legend">OR</p>
              <Button className="border rounded-lg w-8/12">
                Add to Wishlist
              </Button> */}
            </div>
            <div className="flex gap-4 text-center justify-center my-4 text-primary text-xs *:flex *:flex-col *:items-center *:w-1/4 overflow-x-auto *:capitalize">
              {productDetails.returnPolicy.length > 0 && (
                <div className="">
                  {/no/gi.test(productDetails.returnPolicy) ? (
                    <RefreshCwOff size={32} />
                  ) : (
                    <RefreshCcw size={32} />
                  )}
                  <p>{productDetails.returnPolicy}</p>
                </div>
              )}
              {productDetails.warrantyInformation.length > 0 && (
                <div>
                  <ShieldCheck size={32} />
                  <p>{productDetails.warrantyInformation}</p>
                </div>
              )}
            </div>
            <fieldset className="border rounded-lg p-2 mt-4 *:flex *:mt-1 *:*:flex-1 *:border-b last:*:border-none first:*:border-none *border text-sm *:py-1 ">
              <legend className="font-semibold">About this item</legend>
              <div>
                <div>Brand:</div>
                <div>{productDetails.brand}</div>
              </div>
              <div>
                <div>Model:</div>
                <div>{productDetails.title}</div>
              </div>
              <div>
                <div>Sku:</div>
                <div>{productDetails.sku}</div>
              </div>
              <div>
                <div>Dimensions:</div>
                <div>
                  {Object.entries(productDetails.dimensions).map(
                    ([label, value]: [label: string, value: number]) => {
                      return (
                        <div className="capitalize" key={label}>
                          {label}: {Math.round(value)}{" "}
                          <span className="lowercase">cm</span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </fieldset>
            <Link
              className="text-primary font-bold text-xs text-right"
              href="#product-details"
            >
              More info...
            </Link>
          </div>
        </section>
        <section className="mt-16" id="product-details">
          <fieldset className="border p-4 sm:pl-12 rounded-lg">
            <legend>
              <h2 className="text-3xl">Product Details</h2>
            </legend>
            <p className="mt-4">Description: {productDetails.description}</p>
            <h3 className="font-bold mt-4">Product information</h3>
            <div className="md:columns-2">
              <div className="*:flex *:mt-1 *:*:flex-1 *:border-b last:*:border-none *border text-sm *:py-1 ">
                <div>
                  <div>Brand:</div>
                  <div>{productDetails.brand}</div>
                </div>
                <div>
                  <div>Model:</div>
                  <div>{productDetails.title}</div>
                </div>
                <div>
                  <div>Sku:</div>
                  <div>{productDetails.sku}</div>
                </div>
                <div>
                  <div>Warranty:</div>
                  <div className="capitalize">
                    {productDetails.warrantyInformation}
                  </div>
                </div>
                <div>
                  <div>Dimensions:</div>
                  <div>
                    {Object.entries(productDetails.dimensions).map(
                      ([label, value]: [label: string, value: number]) => {
                        return (
                          <div className="capitalize" key={label}>
                            {label}: {Math.round(value)}{" "}
                            <span className="lowercase">cm</span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
                <div>
                  <div>Weight</div>
                  <div>{productDetails.weight}lb</div>
                </div>
                <div>
                  <div>Last updated</div>
                  <div>
                    {new Date(productDetails.meta.updatedAt).toDateString()}
                  </div>
                </div>
                <div>
                  <div>Importer</div>
                  <div>{productDetails.brand || "Not applicable"}</div>
                </div>
                <div>
                  <div>Barcode:</div>
                  <div>{productDetails.meta.barcode}</div>
                </div>
              </div>
              <div className="*:flex *:mt-1 *:*:flex-1 *:border-b last:*:border-none *border text-sm *:py-1" />
            </div>
          </fieldset>
        </section>
        {productDetails.reviews.length > 0 && (
          <section className="my-14 lg:ml-12 sm:mx-2" id="reviews">
            <h2 className="text-3xl underline">Customer Reviews</h2>
            <div className="my-4 w-fit flex items-center gap-1">
              Overall:{" "}
              <StarRatings rating={productDetails.rating} starSize={28} /> (
              {visibleStarRating}/5)
            </div>
            <div className="flex gap-4 max-md:flex-col justify-center overflow-x-auto p-1">
              {productDetails.reviews.map((review) => (
                <div
                  className="shadow-md rounded p-4 max-lg:p-2 flex-auto"
                  key={review.reviewerEmail}
                >
                  <StarRatings rating={review.rating} />
                  <div className="flex justify-between items-center font-semibold">
                    {review.reviewerName}{" "}
                    <div className="text-xs text-ternary">
                      <span className="md:max-lg:hidden max-sm:hidden">
                        Reviewed on{" "}
                      </span>
                      <span>
                        {new Date(review.date).toLocaleDateString("en-us", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">{review.comment}</div>
                </div>
              ))}
            </div>
          </section>
        )}
        <Suspense fallback={<Loader className="mx-auto mt-6" />}>
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

export async function generateMetadata({
  params: { productId },
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const productDetails = await fetch(
    `${process.env.productAPI}/products/${productId}`
  ).then<Product>((res) => res.json());
  if (productDetails.id) {
    return {
      title: `${productDetails.title} - GridBox`,
      description: productDetails.description + " - GridBox",
      keywords: productDetails.tags.join(", "),
      category: productDetails.category,
    };
  }
  return {
    title: "Product Not Found - GridBox",
    description: "Product not found in our database",
  };
}
