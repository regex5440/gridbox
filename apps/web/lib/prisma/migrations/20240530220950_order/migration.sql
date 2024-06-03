/*
  Warnings:

  - Added the required column `discountPercentage` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" ADD COLUMN     "discountPercentage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "tax" DOUBLE PRECISION NOT NULL;
