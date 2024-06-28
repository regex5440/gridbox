"use client";
import { Button, Input } from "@repo/ui";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { addressAction } from "@actions/account";
import type { AddressBook } from "@types";
import FormButton from "./FormButton";

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
  }, [onCancel, state, onConfirm]);
  return (
    <form action={formAction} className={className}>
      <input
        hidden
        name="id"
        readOnly
        type="text"
        value={editableAddress?.id || ""}
      />
      <div className="flex flex-col gap-2">
        <Input
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert"
          data-error={state?.error?.fullName ? true : state?.error?.common}
          defaultValue={editableAddress?.fullName}
          name="name"
          placeholder="Full Name"
          type="text"
        />
        <textarea
          className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert"
          data-error={state?.error?.address ? true : state?.error?.common}
          defaultValue={editableAddress?.address}
          name="address"
          placeholder="Address"
        />
        <div className="flex gap-4 sm:gap-2 max-sm:w-full">
          <Input
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            data-error={state?.error?.city ? true : state?.error?.common}
            defaultValue={editableAddress?.city}
            name="city"
            placeholder="City"
            type="text"
          />
          <Input
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            data-error={state?.error?.state ? true : state?.error?.common}
            defaultValue={editableAddress?.state}
            name="state"
            placeholder="State"
            type="text"
          />
        </div>
        <div className="flex gap-4 sm:gap-2 max-sm:w-full">
          <Input
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            data-error={state?.error?.zip ? true : state?.error?.common}
            defaultValue={editableAddress?.zip}
            name="zip"
            placeholder="Zip Code"
            type="text"
          />
          <Input
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-full"
            data-error={state?.error?.country ? true : state?.error?.common}
            defaultValue={editableAddress?.country}
            name="country"
            placeholder="Country"
            type="text"
          />
        </div>
        <fieldset className="border-t-2 py-2">
          <legend>Contact</legend>
          <Input
            className="border border-gray-400 p-2 rounded-md data-[error=true]:border-alert w-fit"
            data-error={state?.error?.phone ? true : state?.error?.common}
            defaultValue={editableAddress?.phone}
            name="phone"
            placeholder="Phone without country code"
            type="tel"
          />
        </fieldset>
        {state?.error?.common ? <div>{state.error.message}</div> : null}
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
