"use client";
import type { Product } from "@repo/ui/types";
import { useFetchProduct } from "../hooks";
import { ProductTemplate } from "./ProductTemplate";

function ProductTemplateWithFetchHook({ productId }: { productId: string }) {
  const { data, isLoading } = useFetchProduct(productId);
  return <ProductTemplate product={data as Product} showLoader={isLoading} />;
}

export default ProductTemplateWithFetchHook;
