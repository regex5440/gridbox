"use server";

import { AddressBook } from "@types";
import prisma from "../lib/prisma/client";

type LoginCredentials = {
  email: string;
};

type ProfileDetails = {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  gender?: "male" | "female" | "other";
  dob?: Date | null;
  validEmail?: boolean;
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
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      dob: true,
      gender: true,
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
  console.log(user);
  return user;
}

async function verifyEmail({ email, id }: { email: string; id: string }) {
  const user = await prisma.profile.update({
    where: {
      id,
      email,
    },
    data: {
      validEmail: true,
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
  const updatedFields: { [key: string]: string } = {};
  let key: keyof typeof rest;
  for (key in rest) {
    if (typeof rest[key] === "string") {
      updatedFields[key] = rest[key] as string;
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

export {
  authenticateUser,
  createUser,
  getUserById,
  getUserShippingInfo,
  verifyEmail,
  addNewAddress,
  editAddress,
};
