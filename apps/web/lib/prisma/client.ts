import { PrismaClient } from "prisma/prisma-client";
const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// try {
//   prisma.$connect();
// } catch (e) {
//   console.log(e);
//   prisma.$disconnect();
// }

export default prisma;

if (process.env.NODE_ENV === "development") {
  globalThis.prismaGlobal = prisma;
}
