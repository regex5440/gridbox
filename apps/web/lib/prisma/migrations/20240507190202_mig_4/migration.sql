/*
  Warnings:

  - The primary key for the `cartItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `cartItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cartItem" DROP CONSTRAINT "cartItem_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "cartItem_pkey" PRIMARY KEY ("buyerId");
