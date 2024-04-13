"use client";

import { useEffect } from "react";
import { setRecentlyViewedProductIds } from "../utils";

export default function ProductVisitedMarker({
  product_id,
}: {
  product_id: string;
}) {
  useEffect(() => {
    setRecentlyViewedProductIds(product_id);
  }, []);
  return <></>;
}
