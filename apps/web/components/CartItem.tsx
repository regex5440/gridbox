"use client";
import { Product } from "@repo/ui/types";
import SiteMap from "../utils/sitemap";
import Image from "next/image";
import Link from "next/link";
import QtySelector from "./QtySelector";
import { Button, Loader } from "@repo/ui";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { useFetchProduct } from "@hooks/index";

type CartItemProps = {
  initialQty?: number;
  onRemove?: (productId: string) => void;
  onQtyChange?: (qty: number, productId: string) => void;
  className?: string;
  productId?: string;
  productObj?: Product;
} & (
  | {
      productId: string;
    }
  | {
      productObj: Product;
    }
);

export default function CartItem({
  productObj,
  productId,
  initialQty = 1,
  onQtyChange,
  onRemove,
  className = "",
}: CartItemProps) {
  const [quantity, setQuantity] = useState(initialQty);

  const handleQtyChange = (count: number, id: string) => {
    setQuantity(count);
    onQtyChange?.(count, id);
    //TODO: update cart item quantity (debounced?)
  };
  //TODO: style the qty selector based on minicart/cart page/product page

  return (
    <div className={"flex gap-4 border-b pb-2 lg:max-w-lg w-full " + className}>
      {productObj ? (
        <CartItemWithProduct
          product={productObj}
          quantity={quantity}
          handleQtyChange={handleQtyChange}
          onRemove={onRemove}
        />
      ) : productId ? (
        <CartItemProductFetch
          productId={productId}
          quantity={quantity}
          handleQtyChange={handleQtyChange}
          onRemove={onRemove}
        />
      ) : null}
    </div>
  );
}

type CommonProps = {
  quantity: number;
  handleQtyChange: (count: number, id: string) => void;
  onRemove?: (productId: string) => void;
};

function CartItemWithProduct({
  product,
  quantity,
  handleQtyChange,
  onRemove,
}: { product: Product } & CommonProps) {
  return (
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
            onChange={(c) => handleQtyChange(c, String(product.id))}
            triggerClassName="group-[.minicart]:w-10 w-12 h-5 px-1 py-0.5"
            optionClassName="py-0 px-0 "
          />
          <Button
            onClick={onRemove?.bind(null, String(product.id))}
            title="Remove"
            className="text-secondary w-7 h-7 p-1 bg-transparent"
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </>
  );
}

function CartItemProductFetch({
  productId,
  quantity,
  handleQtyChange,
  onRemove,
}: { productId: string } & CommonProps) {
  const { data: product, isLoading, error } = useFetchProduct(productId);

  return (
    <>
      {isLoading && <Loader type={2} className="mx-auto" />}
      {error && <p>Cannot load product</p>}
      {product && (
        <CartItemWithProduct
          product={product}
          quantity={quantity}
          handleQtyChange={handleQtyChange}
          onRemove={onRemove}
        />
      )}
    </>
  );
}
