/*
  Warnings:

  - You are about to drop the column `refunded` on the `billing` table. All the data in the column will be lost.
  - You are about to drop the column `billingId` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingInfo` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[intent]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `billingLocation` to the `billing` table without a default value. This is not possible if the table is not empty.
  - Added the required column `intent` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentStatus` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingLocation` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_billingId_fkey";

-- AlterTable
ALTER TABLE "billing" DROP COLUMN "refunded",
ADD COLUMN     "billingLocation" TEXT NOT NULL,
ADD COLUMN     "isRefunded" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "order" DROP COLUMN "billingId",
DROP COLUMN "shippingInfo",
ADD COLUMN     "intent" TEXT NOT NULL,
ADD COLUMN     "paymentStatus" TEXT NOT NULL,
ADD COLUMN     "shippingLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orderItem" ALTER COLUMN "name" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "order_intent_key" ON "order"("intent");

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_intent_fkey" FOREIGN KEY ("intent") REFERENCES "billing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
