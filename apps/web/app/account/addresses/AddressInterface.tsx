"use client";
import { Button, Dialog as Dg } from "@repo/ui";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { deleteAddressAction } from "@actions/account";
import type { AddressBook } from "@types";
import FormButton from "@components/FormButton";
import AddressForm from "@components/AddressForm";

const {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogHeader,
  DialogFooter,
  DialogOverlay,
  DialogDescription,
  DialogPortal,
} = Dg;

export default function AddressUI({
  addressList,
}: {
  addressList?: AddressBook[];
}) {
  const [addressListState, setAddressListState] = useState(addressList || []);
  const [showForm, setShowForm] = useState(false);
  const [editableAddress, setEditableAddress] = useState<
    AddressBook | undefined
  >();
  const [deleteAddressState, deleteAction] = useFormState(
    deleteAddressAction,
    undefined
  );

  const handleNewAddress = (address: AddressBook) => {
    setAddressListState((prev) => {
      const index = prev.findIndex((item) => item.id === address.id);
      if (index > -1) {
        prev[index] = address;
        return prev;
      }
      return [...prev, address];
    });
  };

  useEffect(() => {
    if (!showForm) setEditableAddress(undefined);
  }, [showForm]);

  useEffect(() => {
    if (deleteAddressState?.success) {
      setAddressListState((prev) => {
        return prev.filter(
          (item) => item.id !== deleteAddressState.success.data.id
        );
      });
    }
  }, [deleteAddressState]);

  const handleEditAddress = (address: AddressBook) => {
    setEditableAddress(address);
    setShowForm(true);
  };

  return (
    <div>
      <div className="flex flex-col gap-3">
        {!showForm &&
          addressListState.map((address) => (
            <div
              className="border rounded p-2 text-sm flex max-sm:flex-col justify-between gap-4"
              key={address.id}
            >
              <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-1">
                <div className="text-nowrap">Full Name:</div>
                <div className="font-semibold text-left">
                  {address.fullName}
                </div>
                <div>Address:</div>
                <div className="font-semibold">
                  <p>
                    {address.address}, {address.city}
                  </p>
                  <p>
                    {address.state}, {address.country} - {address.zip}
                  </p>
                </div>
                <div>Phone:</div>
                <div className="font-semibold">{address.phone}</div>
              </div>
              <div className="text-right flex flex-col gap-2">
                <Button
                  className="btn text-regular"
                  onClick={handleEditAddress.bind(null, address)}
                  variant="outline"
                >
                  <Pencil size="16" />
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="btn text-regular" variant="outline">
                      <Trash2 size="16" />
                    </Button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay className="bg-overlay" />
                    <DialogContent className="bg-surface-secondary text-regular">
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete this address?
                        </DialogTitle>
                      </DialogHeader>
                      <DialogDescription asChild className="bg-surface p-1">
                        <div>
                          {deleteAddressState?.error ? (
                            <p className="text-alert">Something went wrong!</p>
                          ) : null}
                          <div className="border-l border-r border-primary px-2">
                            <p className="font-semibold">{address.fullName}</p>
                            <p>
                              {address.address}, {address.city}
                            </p>
                            <p>
                              {address.state}, {address.country} - {address.zip}
                            </p>
                          </div>
                          <p className="mt-4 italic">
                            <u>Note:</u> Once deleted, you cannot recover this
                            address.
                          </p>
                        </div>
                      </DialogDescription>
                      <DialogFooter className="text-regular-inverted">
                        <form action={deleteAction}>
                          <input
                            hidden
                            name="id"
                            readOnly
                            type="hidden"
                            value={address.id}
                          />
                          <FormButton className="btn text-regular-inverted">
                            Delete
                          </FormButton>
                        </form>
                        <DialogClose asChild>
                          <Button
                            className="btn text-regular"
                            onClick={() => {}}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </div>
            </div>
          ))}
      </div>
      {showForm ? (
        <AddressForm
          className="mt-4"
          editableAddress={editableAddress}
          onCancel={setShowForm}
          onConfirm={handleNewAddress}
        />
      ) : null}
      {!showForm && (
        <Button
          className="btn text-regular-inverted mt-4"
          onClick={() => setShowForm(true)}
        >
          Add New Address
        </Button>
      )}
    </div>
  );
}
