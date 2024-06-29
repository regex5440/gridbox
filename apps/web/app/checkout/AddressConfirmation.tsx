"use client";

import type { MouseEventHandler, SetStateAction } from "react";
import { useRef, useState } from "react";
import { Check, Circle, CircleCheckBig } from "lucide-react";
import { Badge, Button } from "@repo/ui";
import type { AddressBook } from "@types";
import AddressForm from "@components/AddressForm";

export default function AddressConfirmation({
  addressList,
  selectedAddress,
  setSelectedAddress,
  setShowAddressForm,
  showAddressForm,
}: {
  addressList: AddressBook[];
  selectedAddress: { shipping: string; billing: string };
  setSelectedAddress: (
    args: SetStateAction<{ shipping: string; billing: string }>
  ) => void;
  showAddressForm: boolean;
  setShowAddressForm: (args: SetStateAction<boolean>) => void;
}) {
  const [activeStep, setActiveStep] = useState(0);
  const previousStep = useRef(-1);

  const [addressListState, setAddressListState] = useState<AddressBook[]>(
    addressList || []
  );

  const goToStep = (step: number) => {
    setShowAddressForm(false);
    if (step > 0) {
      previousStep.current = activeStep;
    }
    setActiveStep(step);
  };
  const handleNewAddress = (address: AddressBook) => {
    setAddressListState((state) =>
      state.filter((add) => add.id !== address.id).concat(address)
    );
  };
  const setBillingAddress = (id: string) => {
    setSelectedAddress((state) => ({ ...state, billing: id }));
    setTimeout(goToStep, 1000, 2);
  };
  const setShippingAddress = (id: string) => {
    setSelectedAddress((state) => ({ ...state, shipping: id }));
    setTimeout(goToStep, 1000, 1);
  };
  const handleStepChange: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLFieldSetElement;
    if (target.dataset.step !== undefined) {
      const step = Number(target.dataset.step);
      if (step < 0 || step > 2) {
        return;
      }
      let movableStep = 0;
      if (selectedAddress.shipping) {
        movableStep = 1;
      }
      if (selectedAddress.billing) {
        movableStep = 2;
      }
      goToStep(Math.min(step, movableStep));
    }
  };

  const selectedBillingAddress = addressListState.find(
    (add) => add.id === selectedAddress.billing
  );
  const selectedShippingAddress = addressListState.find(
    (add) => add.id === selectedAddress.shipping
  );
  return (
    <div className="lg:max-w-[80%] md:max-w-[90%] overflow-x-hidden">
      <div
        className="flex justify-center gap-8 *:cursor-pointer"
        onClick={handleStepChange}
        role="tablist"
        tabIndex={0}
      >
        <Badge
          className="relative after:border-t-4 after:border-t-gray-300 after:h-0 after:w-8 after:border-dashed after:absolute after:-right-1/2 after:z-0 data-[done=true]:after:border-t-primary"
          data-active={activeStep === 0}
          data-done={selectedAddress.shipping.length > 0}
          data-step={0}
          variant={
            activeStep === 0
              ? "primary"
              : (selectedAddress.shipping.length > 0 && "outline") || "default"
          }
        >
          {selectedAddress.shipping ? (
            <Check className="pointer-events-none" size="16" />
          ) : null}{" "}
          Shipping
        </Badge>
        <Badge
          className="relative after:border-t-4 after:border-t-gray-300 after:h-0 after:w-8 after:border-dashed after:absolute after:-right-1/2 after:-z-[1] data-[done=true]:after:border-t-primary"
          data-active={activeStep === 1}
          data-done={selectedAddress.billing.length > 0}
          data-step={1}
          variant={
            activeStep === 1
              ? "primary"
              : (selectedAddress.billing.length > 0 && "outline") || "default"
          }
        >
          {selectedAddress.billing ? (
            <Check className="pointer-events-none" size="16" />
          ) : null}{" "}
          Billing
        </Badge>
        <Badge
          data-active={activeStep === 2}
          data-step={2}
          variant={activeStep === 2 ? "primary" : "default"}
        >
          Confirm
        </Badge>
      </div>
      {!showAddressForm && activeStep === 0 && (
        <div
          className={`${
            previousStep.current < activeStep
              ? "animate-[slideInRight_0.2s_ease]"
              : "animate-[slideLeftIn_0.2s_ease]"
          } opacity-0 data-[active=true]:opacity-100 transition-opacity`}
          data-active={activeStep === 0}
        >
          <h2 className="text-base my-4 underline">Shipping Address</h2>
          <div className="mb-4 flex flex-col gap-2">
            {addressListState.map((add) => (
              <label className="group" key={add.id}>
                <fieldset className="flex gap-8 items-center border border-gray-400 rounded-lg px-4 cursor-pointer group-has-[input:checked]:border-primary group-has-[input:checked]:border-2 py-1">
                  <input
                    className="w-0 h-0 appearance-none"
                    defaultChecked={add.id === selectedAddress.shipping}
                    hidden
                    name="shipping"
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                    type="radio"
                    value={add.id}
                  />
                  <legend className="text-xl font-bold leading-none">
                    {add.fullName}
                  </legend>
                  <div>
                    <Circle className="group-has-[:checked]:hidden" size="24" />
                    <CircleCheckBig
                      className="hidden text-primary group-has-[:checked]:block"
                      size="24"
                    />
                  </div>
                  <div>
                    <div>
                      <p className="text-xs">
                        {add.address}, {add.city}, {add.state}, {add.country} -{" "}
                        {add.zip}
                      </p>
                      <p className="text-secondary">
                        <span className="text-xs">Contact: </span>
                        <span className="text-sm">{add.phone}</span>
                      </p>
                    </div>
                  </div>
                </fieldset>
              </label>
            ))}
          </div>
        </div>
      )}
      {!showAddressForm && activeStep === 1 && (
        <div
          className={`${
            previousStep.current < activeStep
              ? "animate-[slideInRight_0.2s_ease]"
              : "animate-[slideLeftIn_0.2s_ease]"
          } opacity-0 data-[active=true]:opacity-100 transition-opacity`}
          data-active={activeStep === 1}
        >
          <h2 className="text-base my-4 underline">Billing Address</h2>
          <div className="mb-4 flex flex-col gap-2">
            {addressListState.map((add) => (
              <label className="group" key={add.id}>
                <fieldset className="flex gap-8 items-center border border-gray-400 rounded-lg px-4 cursor-pointer group-has-[input:checked]:border-primary group-has-[input:checked]:border-2 py-1">
                  <input
                    className="w-0 h-0 appearance-none"
                    defaultChecked={add.id === selectedAddress.billing}
                    hidden
                    name="shipping"
                    onChange={(e) => setBillingAddress(e.target.value)}
                    required
                    type="radio"
                    value={add.id}
                  />
                  <legend className="text-xl font-bold leading-none">
                    {add.fullName}
                  </legend>
                  <div>
                    <Circle className="group-has-[:checked]:hidden" size="24" />
                    <CircleCheckBig
                      className="hidden text-primary group-has-[:checked]:block"
                      size="24"
                    />
                  </div>
                  <div>
                    <div>
                      <p className="text-xs">
                        {add.address}, {add.city}, {add.state}, {add.country} -{" "}
                        {add.zip}
                      </p>
                      <p className="text-secondary">
                        <span className="text-xs">Contact: </span>
                        <span className="text-sm">{add.phone}</span>
                      </p>
                    </div>
                  </div>
                </fieldset>
              </label>
            ))}
          </div>
        </div>
      )}
      {!showAddressForm && activeStep === 2 && (
        <div
          className={`${
            previousStep.current < activeStep
              ? "animate-[slideInRight_0.2s_ease]"
              : "animate-[slideLeftIn_0.2s_ease]"
          } opacity-0 data-[active=true]:opacity-100 transition-opacity`}
          data-active={activeStep === 2}
        >
          <h2 className="text-xl mb-4 underline">Confirm Address</h2>
          <div>
            <h3 className="text-base font-bold">Shipping To:</h3>
            <div className="pl-7">
              <p className="font-semibold">
                {selectedShippingAddress?.fullName}
              </p>
              <p>
                {selectedShippingAddress?.address},{" "}
                {selectedShippingAddress?.city},{" "}
                {selectedShippingAddress?.state},{" "}
                {selectedShippingAddress?.country} -{" "}
                {selectedShippingAddress?.zip}
              </p>
              <p>{selectedShippingAddress?.phone}</p>
            </div>
            <h3 className="text-base font-bold mt-4">Billing To:</h3>
            <div className="pl-7">
              <p className="font-semibold">
                {selectedBillingAddress?.fullName}
              </p>
              <p>
                {selectedBillingAddress?.address},{" "}
                {selectedBillingAddress?.city}, {selectedBillingAddress?.state},{" "}
                {selectedBillingAddress?.country} -{" "}
                {selectedBillingAddress?.zip}
              </p>
              <p>{selectedBillingAddress?.phone}</p>
            </div>
          </div>
        </div>
      )}
      {addressListState.length === 0 && !showAddressForm && (
        <p className="text-lg my-4">
          No saved addresses found. Please add a new address.
        </p>
      )}

      {!showAddressForm && activeStep < 2 && (
        <Button
          className="block text-regular-inverted mr-auto"
          onClick={() => setShowAddressForm(true)}
        >
          New Address
        </Button>
      )}
      {showAddressForm ? (
        <div className="mt-4">
          <h2 className="text-xl">Add new address</h2>
          <AddressForm
            onCancel={setShowAddressForm}
            onConfirm={handleNewAddress}
          />
        </div>
      ) : null}
    </div>
  );
}
