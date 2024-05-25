"use client";
import { Button } from "@repo/ui";
import FormButton from "./FormButton";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { handleNewAddress } from "@actions/account";
import { AddressBook } from "@types";

type AddressFormProps = {
  onCancel: (show: boolean) => void;
  onConfirm: (address: AddressBook) => void;
};
export default function AddressForm({ onCancel, onConfirm }: AddressFormProps) {
  const [state, formAction] = useFormState(handleNewAddress, undefined);

  useEffect(() => {
    console.log(state);
    if (state?.success) {
      onCancel?.(false);
      const newAddress = state.success.data;
      onConfirm?.(newAddress);
    }
  }, [onCancel, state]);

  return (
    <form action={formAction}>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
          name="name"
          data-error={
            state?.error?.fullName?.length > 0 || state?.error?.common
          }
        />
        <textarea
          placeholder="Address"
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
          name="address"
          data-error={state?.error?.address?.length > 0 || state?.error?.common}
        />
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
            name="city"
            data-error={state?.error?.city?.length > 0 || state?.error?.common}
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
            name="state"
            data-error={state?.error?.state?.length > 0 || state?.error?.common}
          />
        </div>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Zip Code"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
            name="zip"
            data-error={state?.error?.zip?.length > 0 || state?.error?.common}
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
            name="country"
            data-error={
              state?.error?.country?.length > 0 || state?.error?.common
            }
          />
        </div>
        <fieldset className="border-t-2 py-2">
          <legend>Contact</legend>
          <input
            type="tel"
            placeholder="Phone without country code"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-error"
            name="phone"
            data-error={state?.error?.phone?.length > 0 || state?.error?.common}
          />
        </fieldset>
        {state?.error?.common && <div>{state?.error?.message}</div>}
        <div className="flex gap-2 justify-end">
          <FormButton
            className="text-regular-inverted"
            //   onClick={handleFormSubmit}
          >
            Confirm
          </FormButton>
          <Button
            className="bg-surface-secondary border border-primary"
            onClick={() => onCancel?.(false)}
            type="button"
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
