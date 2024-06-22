"use client";
import { Button, Input } from "@repo/ui";
import FormButton from "./FormButton";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { addressAction } from "@actions/account";
import { AddressBook } from "@types";

type AddressFormProps = {
  onCancel?: (show: boolean) => void;
  onConfirm?: (address: AddressBook) => void;
  className?: string;
  editableAddress?: AddressBook;
};
export default function AddressForm({
  onCancel,
  onConfirm,
  className,
  editableAddress,
}: AddressFormProps) {
  const [state, formAction] = useFormState(addressAction, undefined);

  useEffect(() => {
    if (state?.success) {
      onCancel?.(false);
      const newAddress = state.success.data;
      onConfirm?.(newAddress);
    }
  }, [onCancel, state]);
  return (
    <form action={formAction} className={className}>
      <input
        type="text"
        value={editableAddress?.id || ""}
        name="id"
        readOnly
        hidden
      />
      <div className="flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Full Name"
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert"
          name="name"
          data-error={
            state?.error?.fullName?.length > 0 || state?.error?.common
          }
          defaultValue={editableAddress?.fullName}
        />
        <textarea
          placeholder="Address"
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert"
          name="address"
          data-error={state?.error?.address?.length > 0 || state?.error?.common}
          defaultValue={editableAddress?.address}
        />
        <div className="flex gap-4 sm:gap-2 max-sm:w-full">
          <Input
            type="text"
            placeholder="City"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            name="city"
            data-error={state?.error?.city?.length > 0 || state?.error?.common}
            defaultValue={editableAddress?.city}
          />
          <Input
            type="text"
            placeholder="State"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            name="state"
            data-error={state?.error?.state?.length > 0 || state?.error?.common}
            defaultValue={editableAddress?.state}
          />
        </div>
        <div className="flex gap-4 sm:gap-2 max-sm:w-full">
          <Input
            type="text"
            placeholder="Zip Code"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            name="zip"
            data-error={state?.error?.zip?.length > 0 || state?.error?.common}
            defaultValue={editableAddress?.zip}
          />
          <Input
            type="text"
            placeholder="Country"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            name="country"
            data-error={
              state?.error?.country?.length > 0 || state?.error?.common
            }
            defaultValue={editableAddress?.country}
          />
        </div>
        <fieldset className="border-t-2 py-2">
          <legend>Contact</legend>
          <Input
            type="tel"
            placeholder="Phone without country code"
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-fit"
            name="phone"
            data-error={state?.error?.phone?.length > 0 || state?.error?.common}
            defaultValue={editableAddress?.phone}
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
