"use client";
import { ProductTemplate } from "@repo/ui";
import { useFetchProduct } from "../../hooks";
import { Product } from "@repo/ui/types";

const ProductTemplateWithFetchHook = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useFetchProduct(productId);
  return <ProductTemplate product={data as Product} showLoader={isLoading} />;
};

export default ProductTemplateWithFetchHook;
