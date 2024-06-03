/*
  Warnings:

  - You are about to drop the `billing` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_intent_fkey";

-- DropTable
DROP TABLE "billing";
