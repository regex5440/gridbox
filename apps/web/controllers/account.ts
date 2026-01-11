"use server";

import prisma from "@lib/prisma/client";
import type { AddressBook } from "@types";
import crypto from "crypto";

type ProfileDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  dob?: Date | null;
  validEmail?: boolean;
};

type ProfilePrivateDetails = {
  stripeCustomerId: string;
};

async function authenticateUser({ email }: { email: string }) {
  const user = await prisma.profile.findFirst({
    where: { email },
    select: {
      id: true,
      password: true,
    },
  });
  return user;
}

async function getUserById(id: string) {
  const user = await prisma.profile.findUnique({
    where: { id },
    select: {
      addressBook: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      defaultShipping: true,
      dob: true,
      gender: true,
      id: true,
      validEmail: true,
    },
  });
  return user;
}

async function getUserWithPrivateDetails(id: string) {
  const user = await prisma.profile.findUnique({
    where: { id },
    select: {
      addressBook: true,
      email: true,
      firstName: true,
      lastName: true,
      createdAt: true,
      defaultShipping: true,
      dob: true,
      gender: true,
      id: true,
      validEmail: true,
      stripeCustomerId: true,
    },
  });
  return user;
}

async function createUser({
  dob,
  email,
  firstName,
  gender,
  lastName,
  password,
  validEmail = false,
}: ProfileDetails) {
  const user = await prisma.profile.create({
    data: {
      dob,
      email,
      firstName,
      lastName,
      password,
      gender,
      validEmail,
    },
  });
  return user;
}

async function verifyEmail({
  email,
  id,
  stripeCustomerId,
}: { email: string; id: string } & ProfilePrivateDetails) {
  const user = await prisma.profile.update({
    where: {
      id,
      email,
    },
    data: {
      validEmail: true,
      stripeCustomerId,
    },
    select: {
      id: true,
    },
  });
  return user;
}

async function getUserShippingInfo(userId: string) {
  const addresses = await prisma.shippingInfo.findMany({
    where: {
      profileId: userId,
    },
    select: {
      id: true,
      address: true,
      city: true,
      country: true,
      fullName: true,
      state: true,
      zip: true,
      phone: true,
      createdAt: true,
    },
  });
  return addresses;
}

async function addNewAddress({
  userId,
  address,
  city,
  country,
  fullName,
  phone,
  state,
  zip,
}: { userId: string } & Omit<AddressBook, "id">) {
  const data = await prisma.shippingInfo.create({
    data: {
      address,
      city,
      country,
      fullName,
      state,
      zip,
      phone,
      profileId: userId,
    },
    select: {
      id: true,
      address: true,
      city: true,
      country: true,
      fullName: true,
      state: true,
      zip: true,
      phone: true,
      createdAt: true,
    },
  });
  return data;
}

async function editAddress({
  id,
  ...rest
}: Partial<AddressBook> & Required<Pick<AddressBook, "id">>) {
  const updatedFields: Record<string, string> = {};
  let key: keyof typeof rest;
  for (key in rest) {
    const value = rest[key];
    if (value !== undefined) {
      updatedFields[key] = value;
    }
  }
  const data = await prisma.shippingInfo.update({
    where: {
      id,
    },
    data: updatedFields,
  });
  return data;
}

async function deleteAddress(addressId: string) {
  const data = await prisma.shippingInfo.delete({
    where: {
      id: addressId,
    },
    select: {
      id: true,
    },
  });
  return data;
}

async function getPasskeys(userId: string) {
  return await prisma.passkeys.findMany({
    where: {
      profileId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export type Passkey = Awaited<ReturnType<typeof getPasskeys>>[0];

async function savePasskey({
  name,
  pkey,
  userId,
  credId,
  algorithm,
}: {
  userId: string;
  name: string;
  pkey: string;
  credId: string;
  algorithm: string;
}) {
  return await prisma.passkeys.create({
    data: {
      name,
      pkey,
      profileId: userId,
      credId,
      algorithm,
    },
    select: {
      pkey: false,
      createdAt: true,
      id: true,
      name: true,
    },
  });
}

async function deletePasskey(passkeyId: string, userId: string) {
  return prisma.passkeys.delete({
    where: {
      id: passkeyId,
      profileId: userId,
    },
  });
}

const getPasskeyForAuth = async (credId: string) => {
  return prisma.passkeys.findFirst({
    where: {
      credId,
    },
    select: {
      pkey: true,
      id: true,
      algorithm: true,
      profileId: true,
    },
  });
};

const Challenges = new Map<
  string,
  { challenge: string; challengeId: string; createdAt: Date }
>(); //TODO: can be a cache store

async function createChallenge() {
  const challengeId = crypto.randomUUID();
  const challenge = crypto.randomBytes(32);
  const v = {
    challenge: challenge.toString("base64url"),
    challengeId,
    createdAt: new Date(),
  };
  Challenges.set(challengeId, v);

  //Cleanup old challenges as there is no CRON job
  const oneDayAgo = new Date();
  oneDayAgo.setDate(oneDayAgo.getDate() - 1);
  Challenges.forEach((v, k) => {
    if (v.createdAt.getTime() <= oneDayAgo.getTime()) {
      Challenges.delete(k);
    }
  });
  return v;
}

// Map WebAuthn/COSE algorithm identifiers to Node.js crypto hash algorithms
function getCryptoAlgorithm(webAuthnAlgorithm: string): string {
  const algorithmMap: Record<string, string> = {
    ES256: "sha256", // ECDSA with P-256 and SHA-256
    ES384: "sha384", // ECDSA with P-384 and SHA-384
    ES512: "sha512", // ECDSA with P-521 and SHA-512
    RS256: "RSA-SHA256", // RSASSA-PKCS1-v1_5 with SHA-256
    RS384: "RSA-SHA384",
    RS512: "RSA-SHA512",
    PS256: "RSA-SHA256", // RSASSA-PSS with SHA-256
    PS384: "RSA-SHA384",
    PS512: "RSA-SHA512",
  };
  return algorithmMap[webAuthnAlgorithm] || webAuthnAlgorithm;
}

function validateChallenge(
  challengeId: string,
  clientData: string,
  authenticatorData: string = "",
  signature: string = "",
  publicKey = "",
  algorithmCose = ""
) {
  const storedChallenge = Challenges.get(challengeId);
  if (!storedChallenge) {
    return false;
  }
  const _clientJSON = Buffer.from(clientData, "base64url");
  const clientDataJSON = JSON.parse(_clientJSON.toString());

  if (clientDataJSON.challenge !== storedChallenge.challenge) return false;
  if (clientDataJSON.origin !== process.env.ASSIGNED_URL) return false;

  let isValid = false;
  if (clientDataJSON.type == "webauthn.get") {
    const _authData = Buffer.from(authenticatorData, "base64url");
    const _clientDataHash = crypto
      .createHash("sha256")
      .update(new Uint8Array(_clientJSON))
      .digest();

    const signedChallenge = Buffer.concat([
      Uint8Array.from(_authData),
      Uint8Array.from(_clientDataHash),
    ]);
    isValid = crypto.verify(
      getCryptoAlgorithm(algorithmCose),
      new Uint8Array(signedChallenge),
      crypto.createPublicKey({
        type: "spki",
        format: "der",
        key: Buffer.from(publicKey, "base64url"),
      }),
      new Uint8Array(Buffer.from(signature, "base64url"))
    );
  } else if (clientDataJSON.type == "webauthn.create") {
    isValid = true;
  }

  Challenges.delete(challengeId);
  return isValid;
}

export {
  authenticateUser,
  createUser,
  getUserById,
  getUserWithPrivateDetails,
  getUserShippingInfo,
  verifyEmail,
  addNewAddress,
  editAddress,
  deleteAddress,

  // passkeys
  getPasskeys,
  savePasskey,
  deletePasskey,
  getPasskeyForAuth,
  createChallenge,
  validateChallenge,
};
