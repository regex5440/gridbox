"use server";

import prisma from "../../lib/prisma/client";

type LoginCredentials = {
  email: string;
  password: string;
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

async function authenticateUser({ email, password }: LoginCredentials) {
  const user = await prisma.profile.findFirst({
    where: { email, password },
    select: {
      id: true,
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

export { authenticateUser, createUser, getUserById };
