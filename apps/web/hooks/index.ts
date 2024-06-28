import { useCallback, useRef } from "react";
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

function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
) {
  const timeout = useRef<number | null>(null);
  return useCallback((...args: Parameters<T>) => {
    timeout.current && clearTimeout(timeout.current);
    let returnValue: ReturnType<T> | void = undefined;
    timeout.current = setTimeout(() => {
      returnValue = func(...args);
    }, delay) as unknown as number;
    return returnValue;
  }, []);
}

export { useFetchProduct, useDebounce };
