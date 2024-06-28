"use client";

import { useEffect } from "react";
import { setRecentlyViewedProductIds } from "../utils";

export default function ProductVisitedMarker({
  productId,
}: {
  productId: string;
}) {
  useEffect(() => {
    setRecentlyViewedProductIds(productId);
  }, [productId]);
  return null;
}
