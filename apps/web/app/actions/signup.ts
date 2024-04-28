"use server";

import { SignupFormErrorState, SignupSchema } from "../../lib/definitions";
import { hash } from "../../lib/hash-salt";
import { createUser } from "../controllers/account";

export default async function signup(
  state: SignupFormErrorState,
  formData: FormData
) {
  const validateFields = SignupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    passwordConfirm: formData.get("passwordConfirm"),
    dob: formData.get("dob")
      ? new Date(formData.get("dob") as string)
      : new Date("1 Jan 2000"),
  });

  if (!validateFields.success) {
    //TODO: remove log
    console.log(validateFields.error.flatten().fieldErrors);
    return { error: validateFields.error.flatten().fieldErrors };
  }
  const { email, firstName, password, lastName, dob, gender } =
    validateFields.data;
  console.log("Validated Fields. Hashing password...");
  const hashedPassword = await hash(password);
  console.log("Password hashed. Creating user...");
  //TODO: Create user in database
  await createUser({
    email,
    firstName,
    password: hashedPassword,
    lastName,
    dob,
    gender,
  });
  console.log("User created. Sending verification email...");
  //TODO: sent a verification email with token

  //TODO: Redirect to verify instructions page
}
