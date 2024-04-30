"use server";

import prisma from "../../lib/prisma/client";

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

export { authenticateUser, createUser, getUserById, verifyEmail };
