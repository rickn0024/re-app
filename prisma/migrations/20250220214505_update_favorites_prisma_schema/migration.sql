/*
  Warnings:

  - You are about to drop the column `properties` on the `Favorites` table. All the data in the column will be lost.
  - Added the required column `propertyId` to the `Favorites` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "properties",
ADD COLUMN     "propertyId" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
