import { Button, Accordion as Acdn } from "@repo/ui";
import type { Order } from "@repo/ui/types";
import Link from "next/link";
import { ORDER_STATUS } from "@utils/enums";
import SiteMap from "@utils/sitemap";
import ProductImage from "./ProductImage";

const { Accordion, AccordionItem, AccordionContent, AccordionTrigger } = Acdn;

export default async function OrderTemplate({ order }: { order: Order }) {
  const orderItems = order.orderItem;
  const productDetails: (Record<"thumbnail", string> &
    (typeof orderItems)[number])[] = await Promise.all(
    orderItems.map((item, index) =>
      fetch(
        `${process.env.productAPI}/products/${item.productId}?select=thumbnail`
      )
        .then((res) => res.json())
        .then((data: { thumbnail: string; id: number }) => ({
          ...data,
          ...orderItems[index],
        }))
    )
  );

  const firstProduct = productDetails[0];

  return (
    <div className="rounded-lg shadow-md">
      <div
        aria-label="top"
        className="flex justify-between gap-4 items-center border-b bg-surface-secondary px-3 py-0.5"
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
              className="w-16 h-16"
              quantity={firstProduct.quantity}
              src={firstProduct.thumbnail}
            />
          </Link>
          <div className="flex flex-1 max-sm:flex-col w-full">
            <div className="sm:w-2/3 max-sm:w-1/2 w-full">
              <Link
                className="line-clamp-2 sm:text-nowrap overflow-ellipsis overflow-x-hidden text-ternary w-fit hover:underline"
                href={`${SiteMap.PDP.path}/${firstProduct.productId}`}
              >
                {firstProduct.name}
              </Link>
              <div className="text-sm mt-2">${firstProduct.price}</div>
            </div>
            <div className="sm:ml-auto">
              {!["shipped", "delivered", "cancelled"].includes(
                order.status
              ) && (
                <Button
                  className="p-1 h-fit bg-surface border border-primary shadow-md shadow-primary text-sm mt-2"
                  disabled
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
        {orderItems.length > 1 && (
          <Accordion type="multiple">
            <AccordionItem className="px-2 border-none" value="1">
              <AccordionTrigger className="text-xs text-primary text-right flex-grow underline">
                <div>{orderItems.length - 1} more items</div>
              </AccordionTrigger>
              <AccordionContent>
                {productDetails.slice(1).map((product) => (
                  <Link
                    className="flex gap-4 group"
                    href={`${SiteMap.PDP.path}/${product.productId}`}
                    key={product.productId}
                  >
                    <ProductImage
                      alt={product.name}
                      className="w-16 h-16"
                      quantity={product.quantity}
                      src={product.thumbnail}
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
