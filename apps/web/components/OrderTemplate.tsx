import { Button } from "@repo/ui";
import { Order } from "@repo/ui/types";
import { ORDER_STATUS } from "@utils/enums";
import ProductImage from "./ProductImage";

import { Accordion as Acdn } from "@repo/ui";
import Link from "next/link";
import SiteMap from "@utils/sitemap";

const { Accordion, AccordionItem, AccordionContent, AccordionTrigger } = Acdn;

export default async function ({ order }: { order: Order }) {
  const orderItems = order.orderItem;
  const productDetails: (Record<"thumbnail", string> &
    (typeof orderItems)[number])[] = await Promise.all(
    orderItems.map((item, index) =>
      fetch(
        `${process.env.productAPI}/products/${item.productId}?select=thumbnail`
      )
        .then((res) => res.json())
        .then((data) => ({ ...data, ...orderItems[index] }))
    )
  );

  const firstProduct = productDetails[0];

  return (
    <div className="rounded-lg shadow-md">
      <div
        className="flex justify-between gap-4 items-center border-b bg-surface-secondary px-3 py-0.5"
        aria-label="top"
      >
        <span className="text-xs text-ternary">Order ID: {order.id}</span>
        <span className="flex-grow text-sm text-right">
          Total: ${order.paidAmount}
        </span>
      </div>
      <div className="mt-1 px-2 pb-1 w-full">
        <div className="pl-1 my-2">
          <div className="text-lg">{ORDER_STATUS[order.status].label}</div>
          <div className="flex-grow text-xs">
            Ordered:{" "}
            {order.createdAt.toLocaleString("en-in", {
              dateStyle: "medium",
            })}
          </div>
        </div>
        <div className="flex gap-4">
          <Link href={`${SiteMap.PDP.path}/${firstProduct.productId}`}>
            <ProductImage
              alt={firstProduct.name}
              src={firstProduct.thumbnail}
              quantity={firstProduct.quantity}
              className="w-16 h-16"
            />
          </Link>
          <div className="flex flex-1 max-sm:flex-col w-full">
            <div className="sm:w-2/3 max-sm:w-1/2 w-full">
              <Link
                href={`${SiteMap.PDP.path}/${firstProduct.productId}`}
                className="line-clamp-2 sm:text-nowrap overflow-ellipsis overflow-x-hidden text-ternary w-fit hover:underline"
              >
                {firstProduct.name}
              </Link>
              <div className="text-sm mt-2">${firstProduct.price}</div>
            </div>
            <div className="sm:ml-auto">
              {!["shipped", "delivered", "cancelled"].includes(
                order.status
              ) && (
                <Button className="p-1 h-fit bg-surface border border-primary shadow-md shadow-primary text-sm mt-2">
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
        {orderItems.length > 1 && (
          <Accordion type="multiple">
            <AccordionItem value="1" className="px-2 border-none">
              <AccordionTrigger className="text-xs text-primary text-right flex-grow underline">
                <div>{orderItems.length - 1} more items</div>
              </AccordionTrigger>
              <AccordionContent>
                {productDetails.slice(1).map((product) => (
                  <Link
                    href={`${SiteMap.PDP.path}/${product.productId}`}
                    className="flex gap-4 group"
                    key={product.productId}
                  >
                    <ProductImage
                      alt={product.name}
                      quantity={product.quantity}
                      src={product.thumbnail}
                      className="w-16 h-16"
                    />
                    <div className="flex-grow text-ternary">
                      <div className="line-clamp-2 sm:text-nowrap overflow-ellipsis overflow-x-hidden group-hover:underline">
                        {product.name}
                      </div>
                      <div className="text-sm mt-2">${product.price}</div>
                    </div>
                  </Link>
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </div>
    </div>
  );
}
