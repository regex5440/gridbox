/*
  Warnings:

  - Added the required column `phone` to the `shippingInfo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shippingInfo" ADD COLUMN     "phone" TEXT NOT NULL;
