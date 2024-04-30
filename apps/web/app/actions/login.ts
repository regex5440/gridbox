"use server";

import { LoginFormErrorState, LoginSchema } from "../../lib/definitions";
import { hash } from "../../lib/hash-salt";
import { authenticateUser } from "../controllers/account";
import { createSession } from "../controllers/session";

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
  const hashedPassword = await hash(password);
  const user = await authenticateUser({ email, password: hashedPassword });
  if (!user) {
    return { error: { message: "Credentials are invalid" } };
  }
  console.log(user);
  //TODO: Create Session
  createSession({ id: user.id });
  //TODO: Redirect, based on a query parameter
}
