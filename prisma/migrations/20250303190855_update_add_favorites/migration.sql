/*
  Warnings:

  - You are about to drop the column `propertyId` on the `Favorites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Favorites" DROP CONSTRAINT "Favorites_propertyId_fkey";

-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "propertyId";
