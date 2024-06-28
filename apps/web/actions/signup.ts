"use server";

import { redirect } from "next/navigation";
import { SignupFormErrorState } from "@types";
import { SignupSchema } from "@lib/definitions/account";
import { hash } from "@lib/bcrypt";
import { createUser } from "controllers/account";
import { createEncryptedToken } from "@lib/jwt";
import EmailTemplate from "@lib/email-template";
import sendEmail from "@lib/mailer";
import SiteMap from "@utils/sitemap";

export default async function signup(
  state: SignupFormErrorState,
  formData: FormData
) {
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
    const hashedPassword = await hash(password);
    const user = await createUser({
      email,
      firstName,
      password: hashedPassword,
      lastName,
      dob,
      gender,
    });
    console.log("User created. Sending verification email...");
    //TODO: put this task in a queue: sent a verification email with token
    const verificationToken = await createEncryptedToken(
      {
        email,
        type: "verify",
        userId: user.id,
        name: `${firstName} ${lastName}`.trim(),
      },
      "2h"
    );
    const verificationEmail = new EmailTemplate("verification")
      .values({
        verificationLink: `${process.env.ASSIGNED_URL}${SiteMap.Verify.path}?token=${verificationToken}`,
      })
      .toHTML();
    await sendEmail({
      html: verificationEmail,
      subject: "Verify your email",
      to: email,
    });
  } catch (e) {
    console.log(e);
    return {
      error: { message: "Something went wrong. Please try again." },
    };
  }
  return redirect(SiteMap.Verify.path);
}
