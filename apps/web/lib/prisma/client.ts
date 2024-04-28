import { PrismaClient } from "prisma/prisma-client";

const prisma = new PrismaClient();

try {
  prisma.$connect();
} catch (e) {
  console.log(e);
  prisma.$disconnect();
}

export default prisma;
