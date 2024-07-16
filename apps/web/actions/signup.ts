"use server";

import { RedirectType, redirect } from "next/navigation";
import type { SignupFormErrorState } from "@types";
import { SignupSchema } from "@lib/definitions/account";
import { hash } from "@lib/bcrypt";
import { authenticateUser, createUser } from "controllers/account";
import SiteMap from "@utils/sitemap";

export default async function signup(
  state: SignupFormErrorState,
  formData: FormData
) {
  let userForVerification;
  try {
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
      return { error: validateFields.error.flatten().fieldErrors };
    }
    const { email, firstName, password, lastName, dob, gender } =
      validateFields.data;

    const userExists = await authenticateUser({ email });
    if (userExists) {
      return {
        error: { email: ["User with this email already exists."] },
      };
    }
    const hashedPassword = await hash(password);
    const user = await createUser({
      email,
      firstName,
      password: hashedPassword,
      lastName,
      dob,
      gender,
    });
    userForVerification = user.id;
  } catch (e) {
    return {
      error: { message: "Something went wrong. Please try again." },
    };
  }
  redirect(
    `${SiteMap.Verify.path}?user=${userForVerification}`,
    RedirectType.push
  );
}
