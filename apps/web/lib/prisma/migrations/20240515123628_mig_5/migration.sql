/*
  Warnings:

  - Added the required column `fullName` to the `shippingInfo` table without a default value. This is not possible if the table is not empty.
  - Made the column `profileId` on table `shippingInfo` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "shippingInfo" DROP CONSTRAINT "shippingInfo_profileId_fkey";

-- AlterTable
ALTER TABLE "shippingInfo" ADD COLUMN     "fullName" TEXT NOT NULL,
ALTER COLUMN "profileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "shippingInfo" ADD CONSTRAINT "shippingInfo_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
