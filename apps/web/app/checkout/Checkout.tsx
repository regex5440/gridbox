"use client";
import { Button } from "@repo/ui";
import AddressConfirmation from "./AddressConfirmation";
import Image from "next/image";
import { AddressBook } from "@types";
import { useEffect, useState } from "react";
import { ProductDetail } from "./common";
import { updateAddressInIntent } from "@actions/checkout";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { stripeClient } from "@lib/stripe/payment.client";
import { PaymentIntentResult, StripeElements } from "@stripe/stripe-js";
import { Loader2 } from "lucide-react";
import ProductImage from "@components/ProductImage";

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
  usingCart: boolean;
};

export default function Checkout({
  productDetailList,
  userAddress,
  cartBreakup,
  anyItemNotInStock,
  clientSecret,
  usingCart,
}: CheckoutPageProps) {
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [formData, setFormData] = useState({
    shipping: "",
    billing: "",
  });

  return (
    <div className="lg:max-w-screen-lg w-11/12 mx-auto min-h-[60vh] mt-4">
      <h1 className="max-sm:text-2xl sm:text-3xl font-bold mb-4">Checkout</h1>
      <div className="max-md:flex max-md:flex-col gap-4 md:grid lg:grid-cols-[62%_38%] md:grid-cols-[55%_45%]">
        <div className="h-full">
          <AddressConfirmation
            addressList={userAddress || []}
            selectedAddress={formData}
            setSelectedAddress={setFormData}
            setShowAddressForm={setShowAddressForm}
            showAddressForm={showAddressForm}
          />
        </div>
        <Elements
          stripe={stripeClient}
          options={{
            clientSecret,
            appearance: {
              variables: {
                colorBackground: "rgb(241 245 249)", //surface-2
                borderRadius: "0.3rem",
                focusBoxShadow: "none",
              },
            },
          }}
        >
          <CheckoutPayment
            productDetailList={productDetailList}
            cartBreakup={cartBreakup}
            anyItemNotInStock={anyItemNotInStock}
            formData={formData}
            showAddressForm={showAddressForm}
            usingCart={usingCart}
            clientSecret={clientSecret}
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
  clientSecret,
}: Omit<CheckoutPageProps, "userAddress" | "clientSecret"> & {
  formData: { shipping: string; billing: string };
  showAddressForm: boolean;
  clientSecret: string;
}) {
  const stripe = useStripe();
  const elements = useElements() as StripeElements;
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [generalPageError, setGeneralPageError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const startLoader = (e: React.FormEvent<HTMLFormElement>) => {
    setGeneralPageError("");
    setFormLoading(true);
  };
  const formSubmitHandler = async (formD: FormData) => {
    if (formData.billing.length === 0 || formData.shipping.length === 0) {
      setGeneralPageError("Please select shipping and billing address");
      return;
    }
    await updateAddressInIntent({ ...formData, intentId: paymentIntentId });

    const paymentSubmission = await elements.submit();
    if (paymentSubmission.error) {
      setFormLoading(false);
      return;
    }
    const paymentStatus: PaymentIntentResult | { error: { code: "timeout" } } =
      await new Promise((res, rej) => {
        setTimeout(rej, 3 * 60 * 1000, { error: { code: "timeout" } });
        stripe
          ?.confirmPayment({
            elements,
            confirmParams: {
              return_url: `${document.location.origin}/order_confirmation`,
            },
          })
          .then(res)
          .catch(rej);
      });
    //TODO: A timer can also be set here to cancel the order if payment is not confirmed within a certain time
    if (paymentStatus?.error) {
      if (paymentStatus.error.code === "timeout") {
        setGeneralPageError("Payment request timeout. Please try again!");
      } else {
        setGeneralPageError("Payment Failed. Please try again!");
      }
      setFormLoading(false);

      return;
    }
    setFormLoading(false);
  };

  useEffect(() => {
    if (stripe) {
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ error, paymentIntent }) => {
          if (error) {
            setGeneralPageError("Cannot proceed with payment");
            return;
          }
          setPaymentIntentId(paymentIntent.id || "");
        });
    }
  }, [stripe]);

  return (
    <div>
      <form
        className="max-md:mt-8"
        action={formSubmitHandler}
        onSubmit={startLoader}
      >
        <h2 className="text-xl font-semibold">Product Overview</h2>
        <div className="pb flex flex-col gap-2 ">
          {productDetailList.map((productDetail) => (
            <div
              key={productDetail.id}
              className="flex items-center gap-4 w-full p-1 rounded-md bg-surface-secondary data-[available=false]:border-alert border border-transparent"
              data-available={productDetail.stock > 0}
            >
              <ProductImage
                className="w-14 h-14 border border-secondary rounded-md"
                alt={productDetail.title}
                src={productDetail.thumbnail}
                quantity={productDetail.quantity}
              />
              <div className="flex-1">
                <h3>{productDetail.title}</h3>
                <div className="flex justify-between w-full">
                  <div>${productDetail.price}</div>
                  {productDetail.stock <= 0 && (
                    <div className="text-alert">Out of Stock</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="py-2 rounded-l ">
          <PaymentElement options={{ layout: "accordion" }} />
          {generalPageError.length > 0 && (
            <div className="text-center text-base text-alert mt-2">
              {generalPageError}
            </div>
          )}
          <Button
            className="w-full text-regular-inverted text-xl disabled:bg-gray-400 disabled:cursor-default disabled:opacity-50 mt-4"
            disabled={
              anyItemNotInStock ||
              !(formData.shipping.length > 0) ||
              !(formData.billing.length > 0) ||
              showAddressForm ||
              formLoading
            }
          >
            {formLoading ? (
              <span className="animate-spin">
                <Loader2 />
              </span>
            ) : (
              <span>
                Pay ${Math.trunc(cartBreakup.payable)}
                <span className="text-sm leading-6">
                  .
                  {Math.round(
                    (cartBreakup.payable - Math.trunc(cartBreakup.payable)) *
                      100
                  )}
                </span>
              </span>
            )}
          </Button>
          <p className="text-ternary text-sm text-center my-2">
            Securely Pay with Stripe
          </p>
        </div>
      </form>
    </div>
  );
}
