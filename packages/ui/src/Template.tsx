import { Loader } from "lucide-react";
import { Product } from "../@types";
import Image from "next/image";

type ProductTemplateProps = {
  product: Product;
  showLoader?: boolean;
};

/**
 * @param {Object} props
 * @param {Product} props.product - Product data object
 * @param {string} props.showLoader - (Optional) Show skeleton loader
 * @returns
 */
const ProductTemplate = ({ product, showLoader }: ProductTemplateProps) => {
  //TODO: Replace the temp JSX with proper product templates
  return (
    <>
      {product ? (
        <div
          title={product.title}
          className="group/product-template cursor-pointer h-full flex flex-col justify-start p-1"
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            className="w-full aspect-square object-fill"
            width={100}
            height={150}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
          />
          <h1 className="capitalize mt-2 text-overflow-2-lines group-hover/product-template:underline">
            {product.title}
          </h1>
          <div className="text-color-ternary text-md text-right mt-auto">
            Rs. {product.price}
          </div>
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
};

const ProductTemplateWithControl = () => {
  return (
    <div>
      <h1>ProductWithControl</h1>
    </div>
  );
};

export { ProductTemplate, ProductTemplateWithControl };
