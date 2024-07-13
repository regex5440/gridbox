"use client";
import { Button, Loader } from "@repo/ui";
import { useEffect, useState } from "react";
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import type { PaymentIntentResult } from "@stripe/stripe-js";
import { Loader2, Square, SquareCheckBig, X } from "lucide-react";
import type Stripe from "stripe";
import { useRouter } from "next/navigation";
import { stripeClient } from "@lib/stripe/payment.client";
import {
  updateAddressInIntent,
  updateMetadataInIntent,
} from "@actions/checkout";
import type { AddressBook } from "@types";
import ProductImage from "@components/ProductImage";
import type { ProductDetail } from "./common";
import AddressConfirmation from "./AddressConfirmation";

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

export default function CheckoutProvider({
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
          stripe={stripeClient}
        >
          <CheckoutPayment
            anyItemNotInStock={anyItemNotInStock}
            cartBreakup={cartBreakup}
            clientSecret={clientSecret}
            formData={formData}
            productDetailList={productDetailList}
            showAddressForm={showAddressForm}
            usingCart={usingCart}
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
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [generalPageError, setGeneralPageError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<{
    data: Stripe.PaymentMethod[];
    loading: boolean;
  }>({ data: [], loading: true });
  const [selectedSavedPaymentId, setSelectedSavedPaymentId] = useState("");
  const [savePayment, setSavePayment] = useState(true);

  const startLoader = () => {
    setGeneralPageError("");
    setFormLoading(true);
  };
  const formSubmitHandler = async () => {
    if (formData.billing.length === 0 || formData.shipping.length === 0) {
      setGeneralPageError("Please select shipping and billing address");
      return;
    }
    await updateAddressInIntent({ ...formData, intentId: paymentIntentId });
    let paymentStatus: PaymentIntentResult | undefined;
    if (!stripe) {
      setGeneralPageError("Stripe not initialized. Please try again!");
      setFormLoading(false);
      return;
    }

    //TODO: A timer can also be set here to cancel the order if payment is not confirmed within a certain time
    if (selectedSavedPaymentId) {
      paymentStatus = await stripe.confirmCardPayment(clientSecret, {
        payment_method: selectedSavedPaymentId,
      });
    } else if (elements) {
      await updateMetadataInIntent({
        intentId: paymentIntentId,
        metadata: {
          savePayment: savePayment ? "1" : "0",
        },
      });
      paymentStatus = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${document.location.origin}/order_confirmation`,
        },
      });
    }
    if (paymentStatus?.error) {
      if (paymentStatus.error.message) {
        setGeneralPageError(paymentStatus.error.message);
      } else {
        setGeneralPageError("Payment Failed. Please try again!");
      }
    } else if (
      paymentStatus?.paymentIntent?.confirmation_method === "automatic"
    ) {
      router.push(
        `${document.location.origin}/order_confirmation?success=true&payment_intent=${paymentIntentId}`
      );
    }
    setFormLoading(false);
  };

  useEffect(() => {
    setPaymentMethods({ data: [], loading: true });
    fetch("/api/account/payment-list")
      .then((res) => res.json())
      .then((resJson) => {
        setPaymentMethods({ data: resJson.data || [], loading: false });
      })
      .finally(() => {
        setPaymentMethods((prev) => ({ ...prev, loading: false }));
      });
  }, []);

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
  }, [clientSecret, stripe]);

  return (
    <div>
      <form
        action={() => {
          formSubmitHandler();
        }}
        className="max-md:mt-8"
        onSubmit={startLoader}
      >
        <h2 className="text-xl font-semibold">Product Overview</h2>
        <div className="pb flex flex-col gap-2 ">
          {productDetailList.map((productDetail) => (
            <div
              className="flex items-center gap-4 w-full p-1 rounded-md bg-surface-secondary data-[available=false]:border-alert border border-transparent"
              data-available={productDetail.stock > 0}
              key={productDetail.id}
            >
              <ProductImage
                alt={productDetail.title}
                className="w-14 h-14 border border-secondary rounded-md"
                quantity={productDetail.quantity}
                src={productDetail.thumbnail}
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
          <div>
            <div className="flex justify-between items-end">
              <h3 className="font-medium text-lg">Saved Cards</h3>
              {selectedSavedPaymentId.length > 0 && (
                <Button
                  className="underline text-sm text-primary p-0 bg-transparent border-none m-0 h-auto"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSavedPaymentId("");
                  }}
                  type="button"
                >
                  Clear
                  <X className="inline" size={18} />
                </Button>
              )}
            </div>
            {paymentMethods.data.length > 0 ? (
              <fieldset className="flex flex-col gap-1 my-2">
                {paymentMethods.data.map((method) => (
                  <div className="group/saved" key={method.id}>
                    <input
                      checked={selectedSavedPaymentId === method.id}
                      hidden
                      id={method.id}
                      name="paymentMethod"
                      onChange={(e) => {
                        setSelectedSavedPaymentId(e.currentTarget.value);
                      }}
                      type="radio"
                      value={method.id}
                    />
                    <label
                      className="flex gap-4 items-center border rounded-lg w-full p-4 cursor-pointer group-has-[:checked]/saved:bg-surface-secondary"
                      htmlFor={method.id}
                    >
                      <div className="w-2.5 h-2.5 box-border rounded-[50%] outline outline-offset-2 outline-primary group-has-[:checked]/saved:bg-primary" />
                      <div className="flex justify-between align-center flex-1">
                        <div className="text-lg font-mono">
                          **** **** **** {method.card?.last4}
                        </div>
                        <div className="text-xl uppercase">
                          <span className="mr-4 text-sm">
                            {method.card?.country}
                          </span>
                          {method.card?.brand}
                        </div>
                      </div>
                    </label>
                  </div>
                ))}
              </fieldset>
            ) : paymentMethods.loading ? (
              <Loader className="mx-auto my-4" />
            ) : (
              <p className="text-center my-4 italic text-sm">No cards saved!</p>
            )}
          </div>
          {!elements && <Loader className="mx-auto my-4" />}
          {selectedSavedPaymentId.length === 0 && (
            <>
              <PaymentElement options={{ layout: "accordion" }} />
              {elements !== null && (
                <div className="my-2">
                  <input
                    checked={savePayment}
                    className="hidden"
                    hidden
                    id="savePayment"
                    onChange={(e) => setSavePayment(e.currentTarget.checked)}
                    type="checkbox"
                  />
                  <label
                    className="flex items-start justify-center gap-2 cursor-pointer"
                    htmlFor="savePayment"
                  >
                    <div>
                      {savePayment ? (
                        <SquareCheckBig size={18} />
                      ) : (
                        <Square size={18} />
                      )}
                    </div>
                    <div className="text-ternary text-sm cursor-pointer">
                      Secure & save this card for future payments
                    </div>
                  </label>
                </div>
              )}
            </>
          )}

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
