import { Product } from "@repo/ui/types";
import CartItem from "../../components/CartItem";
import { Button } from "@repo/ui";

export default async function CartPage() {
  const data = await fetch(
    `${process.env.productAPI}/products?limit=5&skip=14`
  ).then((res) => res.json());

  const cartProducts: Product[] = data.products;

  const productQty = 2; // TODO: Receive this from db
  const subTotal = cartProducts.reduce(
    (acc, product) => acc + product.price * productQty,
    0
  );
  const maxDiscountPercentage = cartProducts.reduce(
    (acc, product) =>
      acc > product.discountPercentage ? acc : product.discountPercentage,
    0
  );
  const discountedPrice = subTotal * (maxDiscountPercentage / 100);
  const tax = discountedPrice * 0.1; // 10%
  return (
    <div className="px-common-x lg:mx-auto flex lg:justify-around max-lg:justify-between lg:w-10/12 max-lg:w-full max-md:flex-col max-w-screen-xl">
      <div className="md:w-1/2 group/items group-last:border-0">
        <h1 className="text-3xl mb-4">Cart</h1>
        {cartProducts.map((product) => (
          <CartItem
            key={product.id}
            product={product}
            className="mb-2 [&:last-child]:border-0"
          />
        ))}
      </div>
      <div className="md:border-l h-fit lg:w-1/3 md:w-2/5 max-md:border-t max-md:p-4 px-4 md:mt-12 sticky top-20">
        <div className="w-full">
          <div className="*:flex *:justify-between *:mb-3">
            <div>
              <span className="text-left">Subtotal</span>{" "}
              <span className="text-right text-xl">${subTotal.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-left">
                Discount{" "}
                <span className="text-xs">({maxDiscountPercentage}%)</span>
              </span>{" "}
              <span className="text-right text-xl">
                - ${discountedPrice.toFixed(2)}
              </span>
            </div>
            <div>
              <span className="text-left">Tax</span>{" "}
              <span className="text-right text-xl">+ ${tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-b py-1">
              <span className="text-left text-2xl">You Pay</span>{" "}
              <span className="text-right text-2xl">
                ${(subTotal - discountedPrice + tax).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
        <Button className="bg-add-to-cart w-full text-xl h-12">
          Proceed to Checkout
        </Button>
        <p className="text-ternary text-sm text-center my-2">
          Securely Pay with
        </p>
      </div>
    </div>
  );
}
