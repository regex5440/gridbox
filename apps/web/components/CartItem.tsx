"use client";
import { Product } from "@repo/ui/types";
import SiteMap from "../utils/sitemap";
import Image from "next/image";
import Link from "next/link";
import QtySelector from "./QtySelector";
import { Button } from "@repo/ui";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useFetchProduct } from "@hooks/index";

type CartItemProps = {
  productId: string;
  initialQty?: number;
  onRemove?: (productId: string) => void;
  onQtyChange?: (qty: number, productId: string) => void;
  className?: string;
};

export default function CartItem({
  productId,
  initialQty = 1,
  onQtyChange,
  onRemove,
  className = "",
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQty);
  const { data: product, isLoading, error } = useFetchProduct(productId);

  const handleQtyChange = (count: number) => {
    setQuantity(count);
    onQtyChange?.(count, productId);
    //TODO: update cart item quantity (debounced?)
  };

  return (
    <div className={"flex gap-4 border-b pb-2 lg:max-w-lg w-full " + className}>
      {isLoading && <p>Loading...</p>}
      {error && <p>Cannot load product</p>}
      {product && (
        <>
          <Link href={`${SiteMap.PDP.path}/${product.id}`}>
            <div className="relative w-24 h-24">
              <Image src={product.thumbnail} alt={product.title} fill />
              {/* <div className="absolute bottom-0.5 right-0.5 rounded-full aspect-square w-fit p-1 flex justify-center items-center backdrop-invert">
            <span className="text-sm font-semibold"></span>
          </div> */}
            </div>
          </Link>
          <div className="flex flex-col justify-between w-full">
            <Link href={`${SiteMap.PDP.path}/${product.id}`}>
              <h3 className="text-xl line-clamp-1">{product.title}</h3>
            </Link>
            <p>${product.price}</p>
            <div className="flex justify-between items-center">
              <QtySelector
                count={quantity}
                onChange={handleQtyChange}
                buttonClassName="group-[.minicart]:w-6 group-[.minicart]:h-6 p-1 text-regular cursor-pointer bg-transparent border-2 border-primary"
                countClassName="text-base w-7 text-center text-primary"
              />
              <Button
                onClick={onRemove?.bind(null, String(product.id))}
                title="Remove"
                className="group-[.minicart]:text-secondary group-[.minicart]:w-7 group-[.minicart]:h-7 group-[.minicart]:p-1 group-[.minicart]:bg-transparent"
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
