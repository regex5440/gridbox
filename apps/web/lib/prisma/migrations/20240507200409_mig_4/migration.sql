/*
  Warnings:

  - A unique constraint covering the columns `[buyerId,productId]` on the table `cartItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cartItem_buyerId_productId_key" ON "cartItem"("buyerId", "productId");
