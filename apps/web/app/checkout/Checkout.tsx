"use client";
import { Button } from "@repo/ui";
import AddressConfirmation from "./AddressConfirmation";
import Image from "next/image";
import { AddressBook } from "@types";
import { useState } from "react";
import { ProductDetail } from "./common";
import { checkout } from "@actions/checkout";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { stripeClient } from "@lib/payment.client";

type CheckoutPageProps = {
  productDetailList: ProductDetail[];
  userAddress: AddressBook[];
  cartBreakup: {
    subTotal: number;
    maxDiscountPercentage: number;
    discountedPrice: number;
    tax: number;
    payable: number;
  };
  anyItemNotInStock: boolean;
  clientSecret: string;
};

export default function Checkout({
  productDetailList,
  userAddress,
  cartBreakup,
  anyItemNotInStock,
  clientSecret,
}: CheckoutPageProps) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    shipping: "",
    billing: "",
  });

  return (
    <div className="lg:max-w-screen-xl w-[70%] mx-auto min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">Checkout</h1>
      <div className="max-lg:flex max-lg:flex-col gap-4 lg:grid lg:grid-cols-[60%_40%]">
        <div className="to-red-400 h-full">
          <AddressConfirmation
            addressList={userAddress || []}
            selectedAddress={formData}
            setSelectedAddress={setFormData}
            setShowAddressForm={setShowAddressForm}
            showAddressForm={showAddressForm}
          />
        </div>
        <Elements stripe={stripeClient} options={{ clientSecret }}>
          <CheckoutPayment
            productDetailList={productDetailList}
            cartBreakup={cartBreakup}
            anyItemNotInStock={anyItemNotInStock}
            formData={formData}
            showAddressForm={showAddressForm}
          />
        </Elements>
      </div>
    </div>
  );
}

function CheckoutPayment({
  productDetailList,
  cartBreakup,
  anyItemNotInStock,
  formData,
  showAddressForm,
}: Omit<CheckoutPageProps, "userAddress" | "clientSecret"> & {
  formData: { shipping: string; billing: string };
  showAddressForm: boolean;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const formHandler = async (formData) => {
    console.log(formData);
    //TODO: Finalize the checkout form page
    const paymentStatus = await stripe?.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/account/orders",
      },
    });

    console.log(paymentStatus);
  };

  return (
    <form className="to-blue-400 max-lg:mt-8" action={formHandler}>
      <h2 className="text-xl font-semibold">Cart</h2>
      <div className="lg:border-l lg:border-l-gray-400 lg:pl-2 pb-2 flex flex-col gap-2">
        {productDetailList.map((productDetail) => (
          <div
            key={productDetail.id}
            className="flex items-center gap-4 w-full p-1 rounded-md bg-surface-secondary data-[available=false]:border-error border-2 border-transparent"
            data-available={productDetail.stock > 0}
          >
            <input
              type="checkbox"
              name="product"
              value={[productDetail.id, productDetail.quantity].join(",")}
              hidden
              multiple
              checked
              readOnly
            />
            <div className="relative w-14 h-14 border border-secondary rounded-md overflow-hidden box-border">
              <Image
                src={productDetail.thumbnail}
                alt={productDetail.title}
                className="object-cover"
                fill
              />
              <div className="absolute right-0.5 bottom-0.5 rounded-full w-1/3 aspect-square flex justify-center items-center text-xs bg-black text-white leading-none">
                {productDetail.quantity}
              </div>
            </div>
            <div className="flex-1">
              <h3>{productDetail.title}</h3>
              <div className="flex justify-between w-full">
                <div>${productDetail.price}</div>
                {productDetail.stock <= 0 && (
                  <div className="text-error">Out of Stock</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-400 py-2 lg:pl-2 lg:border-l">
        <input
          type="text"
          value={formData.shipping}
          name="shipping"
          hidden
          readOnly
        />
        <input
          type="text"
          value={formData.billing}
          name="billing"
          hidden
          readOnly
        />
        <PaymentElement options={{ layout: "tabs" }} />
        <Button
          className="w-full text-regular-inverted text-xl disabled:bg-gray-400 disabled:cursor-default disabled:opacity-50 my-4"
          disabled={
            anyItemNotInStock ||
            !(formData.shipping.length > 0) ||
            !(formData.billing.length > 0) ||
            showAddressForm
          }
        >
          Pay ${Math.trunc(cartBreakup.payable)}
          <span className="text-sm leading-6">
            .
            {Math.round(
              (cartBreakup.payable - Math.trunc(cartBreakup.payable)) * 100
            )}
          </span>
        </Button>
        <p className="text-ternary text-sm text-center my-2">
          Securely Pay with Stripe
        </p>
      </div>
    </form>
  );
}
