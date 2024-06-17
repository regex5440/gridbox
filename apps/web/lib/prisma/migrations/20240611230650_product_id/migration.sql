/*
  Warnings:

  - Made the column `productId` on table `orderItem` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "orderItem" ALTER COLUMN "productId" SET NOT NULL;
