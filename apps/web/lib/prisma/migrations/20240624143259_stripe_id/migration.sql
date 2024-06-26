/*
  Warnings:

  - Made the column `stripeCustomerId` on table `profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "profile" ALTER COLUMN "stripeCustomerId" SET NOT NULL;
