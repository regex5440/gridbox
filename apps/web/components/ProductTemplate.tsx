import { Loader } from "lucide-react";
import type { Product } from "@repo/ui/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@repo/ui/utils";
import SiteMap from "../utils/sitemap";
import StarRatings from "./StarRating";

type ProductTemplateProps = {
  product: Product;
  showLoader?: boolean;
  className?: string;
  [key: string]: any;
};

/**
 * @param {Object} props
 * @param {Product} props.product - Product data object
 * @param {string} props.showLoader - (Optional) Show skeleton loader
 * @returns
 */
function ProductTemplate({
  product,
  showLoader,
  className,
  ...rest
}: ProductTemplateProps) {
  return (
    <>
      {product ? (
        <div
          className={cn(
            "group/product-template cursor-pointer h-auto flex flex-col justify-start p-1 select-none relative",
            className
          )}
          title={product.title}
          {...rest}
        >
          <div className="absolute -right-0.5 top-1 bg-surface-secondary px-2 text-sm rounded-l">
            -{product.discountPercentage.toFixed(1)}%
          </div>
          <Link href={`${SiteMap.PDP.path}/${product.id}`}>
            <Image
              alt={product.title}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
              className="w-full aspect-square object-fill border-b"
              height={240}
              src={product.thumbnail}
              width={240}
            />
            <div className="px-2">
              <h1 className="capitalize mt-2 line-clamp-2 group-hover/product-template:underline text-center">
                {product.title}
              </h1>
              <div className="flex flex-col mt-1">
                <div className="flex items-center justify-center flex-wrap">
                  <StarRatings rating={product.rating} starSize={16} />
                  <div className="text-sm">({product.rating.toFixed(1)})</div>
                </div>
                <div className="text-color-ternary text-md text-center mt-2 text-nowrap flex-grow">
                  $ {product.price}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        showLoader && (
          <div className="grid place-content-center aspect-square">
            <Loader className="loader-color animate-infiniteRotate" />
          </div>
        )
      )}
    </>
  );
}

function ProductTemplateWithControl() {
  return (
    <div>
      <h1>ProductWithControl</h1>
    </div>
  );
}

export { ProductTemplate, ProductTemplateWithControl };
