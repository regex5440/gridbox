"use client";
import { Product } from "@repo/ui/types";
import SiteMap from "../utils/sitemap";
import Image from "next/image";
import Link from "next/link";
import QtySelector from "./QtySelector";
import { Button } from "@repo/ui";
import { Trash2 } from "lucide-react";

type CartItemProps = {
  product: Product;
  onRemove?: (productId: string) => void;
  onQtyChange?: (qty: number, productId: string) => void;
  className?: string;
};

export default function CartItem({
  product,
  onQtyChange,
  onRemove,
  className = "",
}: CartItemProps) {
  return (
    <div className={"flex gap-4 border-b pb-2 lg:max-w-lg w-full " + className}>
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
            buttonHeight={7}
            initialCount={3}
            onChange={(count) => onQtyChange?.(count, String(product.id))}
          />
          <Button
            onClick={onRemove?.bind(null, String(product.id))}
            title="Remove"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
