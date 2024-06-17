/*
  Warnings:

  - Made the column `orderId` on table `orderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_orderId_fkey";

-- AlterTable
ALTER TABLE "orderItem" ADD COLUMN     "productId" TEXT,
ALTER COLUMN "orderId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
