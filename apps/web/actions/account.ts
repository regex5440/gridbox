import { AddressSchema } from "@lib/definitions/account";
import { authenticateUser } from "./auth";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  getUserShippingInfo,
} from "controllers/account";
import { AddressFormState, DeleteAddressState } from "@types";

const getUserAddresses = async () => {
  const authenticUser = await authenticateUser();
  if (authenticUser.error) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;
  const addresses = await getUserShippingInfo(userId);
  return { success: { data: addresses } };
};

const addressAction = async (
  state: AddressFormState,
  formData: FormData
): Promise<AddressFormState> => {
  const authenticUser = await authenticateUser();
  if (authenticUser.error) {
    return { error: { common: true, message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;
  const validAddress = AddressSchema.safeParse({
    fullName: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    zip: formData.get("zip"),
    phone: formData.get("phone"),
  });
  if (!validAddress.success) {
    return {
      error: validAddress.error.flatten().fieldErrors,
    };
  }
  let data;
  const addressId = formData.get("id")?.toString() || "";
  if (addressId.length > 0) {
    data = await editAddress({ ...validAddress.data, id: addressId });
  } else {
    data = await addNewAddress({ userId, ...validAddress.data });
  }
  return { success: { data } };
};

const deleteAddressAction = async (
  state: DeleteAddressState,
  formData: FormData
) => {
  const authenticUser = await authenticateUser();
  if (authenticUser.error) {
    return { error: { common: true, message: "Unauthorized" } };
  }
  const addressId = formData.get("id")?.toString() || "";
  if (addressId.length === 0) {
    return { error: { common: true, message: "Address Id is required" } };
  }
  const deletedAddress = await deleteAddress(addressId);
  return { success: { data: deletedAddress } };
};

export { getUserAddresses, addressAction, deleteAddressAction };
