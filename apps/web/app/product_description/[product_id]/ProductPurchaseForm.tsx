"use client";
import { Button } from "@repo/ui";
import { buyNowAction } from "actions/cart";
import { useEffect, useState } from "react";
import useMiniCart from "@lib/store/minicart";
import { LoaderCircle } from "lucide-react";
import QtySelector from "@components/QtySelector";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import FormButton from "@components/FormButton";

export default function ProductPurchaseForm({
  productId,
}: {
  productId: string;
}) {
  const [formState, formAction] = useFormState(buyNowAction, undefined);
  const [loadingAddToCart, setLoadingAddToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { toggle, addCartItem } = useMiniCart();
  const router = useRouter();

  useEffect(() => {
    if (formState?.error?.redirect) {
      router.push(formState.error.redirect);
    } else if (formState?.success?.redirect) {
      router.push(formState.success.redirect);
    }
  }, [formState]);

  return (
    <div>
      <form className="text-center" action={formAction}>
        <input type="hidden" name="productId" value={productId} />
        <div className="flex gap-4 items-end">
          <QtySelector
            count={quantity}
            onChange={setQuantity}
            optionClassName="py-0.5 px-1"
            triggerClassName="w-20"
          />
          <FormButton className="bg-buy-now text-white p-2 rounded-md mt-4 w-full">
            Buy Now
          </FormButton>
        </div>
      </form>
      <Button
        data-loading={loadingAddToCart}
        className="bg-add-to-cart p-2 rounded-md mt-3 w-full"
        onClick={(e) => {
          setLoadingAddToCart(true);
          fetch("/api/cart", {
            method: "POST",
            body: JSON.stringify({ productId, quantity }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                router.push("/signin");
              } else {
                addCartItem(data.data);
                toggle(true);
              }
            })
            .catch((err) => {
              console.log("Unauthorized");
            })
            .finally(() => {
              setLoadingAddToCart(false);
            });
        }}
      >
        {loadingAddToCart ? (
          <LoaderCircle className="animate-spin" />
        ) : (
          "Add to Cart"
        )}
      </Button>
    </div>
  );
}
