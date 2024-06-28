"use client";

import { Loader } from "@repo/ui";
import type { Product } from "@repo/ui/types";
import Image from "next/image";
import { Suspense, useState } from "react";

export default function ProductImageSection({ product }: { product: Product }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div>
      <div className="md:w-96 md:h-96 w-76 h-76 mx-auto">
        <Image
          alt={product.title}
          className="object-contain h-full w-full"
          height={800}
          priority
          src={product.images[activeImageIndex]}
          width={800}
        />
      </div>
      <div className="flex gap-4 md:justify-center mt-6 max-w-full overflow-x-auto">
        {product.images.map((imgUrl: string, i) => (
          <Suspense
            fallback={
              <div className="grid place-content-center">
                <Loader iconSize={12} type={2} />
              </div>
            }
            key={imgUrl}
          >
            <Image
              alt={product.title}
              className={`object-contain box-border rounded-md aspect-square ${activeImageIndex === i ? "border-4" : ""}`}
              height={70}
              onClick={setActiveImageIndex.bind(null, i)}
              src={imgUrl}
              width={70}
            />
          </Suspense>
        ))}
      </div>
    </div>
  );
}
