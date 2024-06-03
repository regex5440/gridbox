/*
  Warnings:

  - You are about to drop the column `discountPercentage` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `tax` on the `order` table. All the data in the column will be lost.
  - Added the required column `discountApplied` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paidAmount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxAdded` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order" DROP COLUMN "discountPercentage",
DROP COLUMN "price",
DROP COLUMN "tax",
ADD COLUMN     "discountApplied" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "paidAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxAdded" DOUBLE PRECISION NOT NULL;
