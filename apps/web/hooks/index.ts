import useSWR, { SWRConfiguration } from "swr";

const useFetchProduct = (productId: string, extra?: SWRConfiguration) => {
  const response = useSWR(
    `/api/products/${productId}`,
    (path: string) =>
      fetch(path)
        .then((res) => res.json())
        .then((data) => data.data),
    extra
  );
  return response;
};

export { useFetchProduct };
