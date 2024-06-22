import { getUserAddresses } from "@actions/account";
import AddressUI from "./AddressUI";
import { Suspense } from "react";

export default async function Addresses() {
  const userAddressList = await getUserAddresses();
  return (
    <div>
      <h1 className="text-2xl semibold max-lg:hidden">
        Address Book{" "}
        {userAddressList.success && (
          <span>({userAddressList.success.data.length})</span>
        )}
      </h1>
      <div className="mt-4">
        {userAddressList.error && (
          <p className="text-center">Something went wrong!</p>
        )}
        {userAddressList.success?.data.length === 0 && (
          <p className="text-center">No address found!</p>
        )}
      </div>
      <Suspense fallback={"Loading"}>
        <AddressUI addressList={userAddressList.success?.data} />
      </Suspense>
    </div>
  );
}
