"use client";
import { useFetchProduct } from "../hooks";
import { Product } from "@repo/ui/types";
import { ProductTemplate } from "./ProductTemplate";

const ProductTemplateWithFetchHook = ({ productId }: { productId: string }) => {
  const { data, isLoading } = useFetchProduct(productId);
  return <ProductTemplate product={data as Product} showLoader={isLoading} />;
};

export default ProductTemplateWithFetchHook;
