import { AddressSchema } from "@lib/definitions";
import { authenticateUser } from "./auth";
import {
  addNewAddress,
  editAddress,
  getUserShippingInfo,
} from "controllers/account";
import { AddressFormState } from "@types";

const getUserAddresses = async () => {
  const authenticUser = await authenticateUser();
  if (authenticUser.error) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;
  const addresses = await getUserShippingInfo(userId);
  return { success: { data: addresses } };
};

const handleNewAddress = async (
  state: AddressFormState,
  formData: FormData
) => {
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

  const data = await addNewAddress({ userId, ...validAddress.data });
  return { success: { data } };
};

const handleEditAddress = async (state, formData: FormData) => {
  //TODO: handle edit address
  const authenticUser = await authenticateUser();
  if (authenticUser.error) {
    return { error: { message: "Unauthorized" } };
  }
  const userId = authenticUser.data.id;
  const validAddress = safeParse({
    id: formData.get("id"),
    fullName: formData.get("name"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    zip: formData.get("zip"),
    phone: formData.get("phone"),
  });
  if (!validAddress.success) {
    return { error: { message: validAddress.error.flatten() } };
  }

  const data = await editAddress({ ...validAddress.data });
  return { success: { data } };
};

export { getUserAddresses, handleNewAddress, handleEditAddress };
