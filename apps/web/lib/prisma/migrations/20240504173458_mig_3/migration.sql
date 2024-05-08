/*
  Warnings:

  - The primary key for the `order` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orderId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `order` table. All the data in the column will be lost.
  - Added the required column `billingId` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactInfo` to the `order` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `order` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `shippingInfo` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_id_fkey";

-- AlterTable
ALTER TABLE "order" DROP CONSTRAINT "order_pkey",
DROP COLUMN "orderId",
DROP COLUMN "totalPrice",
ADD COLUMN     "billingId" TEXT NOT NULL,
ADD COLUMN     "contactInfo" TEXT NOT NULL,
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "shippingInfo" TEXT NOT NULL,
ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "orderItem" ALTER COLUMN "orderId" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "shippingInfo" (
    "id" TEXT NOT NULL,
    "profileId" TEXT,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zip" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shippingInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cartItem" (
    "id" TEXT NOT NULL,
    "buyerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "billing" (
    "id" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "refunded" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL,
    "paidBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "billing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "shippingInfo" ADD CONSTRAINT "shippingInfo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cartItem" ADD CONSTRAINT "cartItem_buyerId_fkey" FOREIGN KEY ("buyerId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_billingId_fkey" FOREIGN KEY ("billingId") REFERENCES "billing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
