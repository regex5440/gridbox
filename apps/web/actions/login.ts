"use server";

import { authenticateUser } from "controllers/account";
import { createSession } from "controllers/session";
import { compareHash } from "@lib/bcrypt";
import { LoginSchema } from "@lib/definitions/account";
import { LoginFormErrorState } from "@types";

export default async function login(
  state: LoginFormErrorState,
  formData: FormData
) {
  //TODO: Validate formData
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  if (!validateFields.success) {
    //TODO: remove log
    console.log(validateFields.error.flatten().fieldErrors);
    return { error: validateFields.error.flatten().fieldErrors };
  }
  //TODO: Authenticate user
  const { email, password } = validateFields.data;
  try {
    const userData = await authenticateUser({ email });
    if (userData) {
      const validUser = await compareHash(password, userData.password);
      if (validUser) {
        await createSession({ id: userData.id });
        return { success: true };
      }
    }
  } catch (e) {
    console.error(e);
    return { error: { message: "Something went wrong!" } };
  }
  return { error: { message: "Credentials are invalid" } };
}
