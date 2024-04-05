import useSWR, { SWRConfiguration } from "swr";
import { fetchProduct } from "../services";

const useFetchProduct = (productId: string, extra?: SWRConfiguration) => {
  const response = useSWR(`/api/products/${productId}`, fetchProduct, extra);
  return response;
};

export { useFetchProduct };
