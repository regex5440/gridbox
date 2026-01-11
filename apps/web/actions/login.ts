"use server";

import {
  authenticateUser,
  getPasskeyForAuth,
  validateChallenge,
} from "controllers/account";
import { createSession } from "controllers/session";
import { compareHash } from "@lib/bcrypt";
import { LoginSchema } from "@lib/definitions/account";
import { LoginFormErrorState } from "@types";

export default async function login(
  _: LoginFormErrorState,
  formData: FormData
) {
  const validateFields = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    credId: formData.get("credId"),
    clientDataJSON: formData.get("clientDataJSON"),
    authenticatorData: formData.get("authenticatorData"),
    signature: formData.get("signature"),
    challengeId: formData.get("challengeId"),
    algorithm: formData.get("algorithm"),
  });
  if (!validateFields.success) {
    return { error: validateFields.error.flatten().fieldErrors };
  }
  try {
    let userId = "";
    if ("credId" in validateFields.data) {
      const {
        authenticatorData,
        challengeId,
        clientDataJSON,
        credId,
        signature,
      } = validateFields.data;
      const clientJson = JSON.parse(
        Buffer.from(clientDataJSON, "base64url").toString()
      );
      if (clientJson.origin !== process.env.ASSIGNED_URL) {
        throw new Error("Invalid origin for passkey login");
      }

      const data = await getPasskeyForAuth(credId);
      if (!data) {
        return { error: { message: "Passkey not registered" } };
      }

      const isValidChallenge = validateChallenge(
        challengeId,
        clientDataJSON,
        authenticatorData,
        signature,
        data.pkey,
        data.algorithm
      );
      if (!isValidChallenge) {
        return { error: { message: "Invalid challenge for passkey login" } };
      }
      userId = data.profileId;
    } else {
      const { email, password } = validateFields.data;
      const userData = await authenticateUser({ email });
      if (!userData) {
        return { error: { message: "User does not exists" } };
      }
      const validUser = await compareHash(password, userData.password);
      validUser && (userId = userData.id);
    }
    if (userId) {
      await createSession({ id: userId });
      return { success: true };
    }
  } catch (e) {
    console.error(e);
    return { error: { message: "Something went wrong!" } };
  }
  return { error: { message: "Credentials are invalid" } };
}
