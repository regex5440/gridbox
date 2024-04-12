"use client";

import { Product } from "@repo/ui/types";
import Image from "next/image";
import { Suspense, useState } from "react";

export default function ProductImageSection({ product }: { product: Product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div>
      <div className="w-96 h-96">
        <Image
          src={product?.images[activeImageIndex]}
          alt={product?.title}
          width={100}
          height={100}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="flex gap-4 justify-center mt-6 max-w-full overflow-x-auto">
        {product?.images.map((img_url: string, i) => (
          <Suspense key={img_url} fallback={<div>Loading...</div>}>
            <Image
              src={img_url}
              alt={product?.title}
              width={70}
              height={70}
              className={`object-cover box-border rounded-md ${activeImageIndex === i ? "border-4" : ""}`}
              onClick={setActiveImageIndex.bind(null, i)}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
