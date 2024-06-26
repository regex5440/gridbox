/*
  Warnings:

  - A unique constraint covering the columns `[stripeCustomerId]` on the table `profile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "stripeCustomerId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "profile_stripeCustomerId_key" ON "profile"("stripeCustomerId");
