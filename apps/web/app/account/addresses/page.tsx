import { Suspense } from "react";
import { getUserAddresses } from "@actions/account";
import AddressUI from "./AddressInterface";
import { Metadata } from "next";

export default async function Addresses() {
  const userAddressList = await getUserAddresses();
  return (
    <div>
      <h1 className="text-2xl semibold max-lg:hidden">
        Address Book{" "}
        {userAddressList.success ? (
          <span>({userAddressList.success.data.length})</span>
        ) : null}
      </h1>
      <div className="mt-4">
        {userAddressList.error ? (
          <p className="text-center">Something went wrong!</p>
        ) : null}
        {userAddressList.success?.data.length === 0 && (
          <p className="text-center">No address found!</p>
        )}
      </div>
      <Suspense fallback="Loading">
        <AddressUI addressList={userAddressList.success?.data} />
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Account/Saved Addresses - GridBox",
  description:
    "View and manage your saved addresses on GridBox e-commerce site",
};
