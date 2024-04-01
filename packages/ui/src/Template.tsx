import { Product } from "../@types";

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
    <div>
      {product ? (
        <>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full aspect-square object-fill"
          />
          <h1 className="capitalize">{product.title}</h1>
        </>
      ) : (
        showLoader && <div>Loading...</div>
      )}
    </div>
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
