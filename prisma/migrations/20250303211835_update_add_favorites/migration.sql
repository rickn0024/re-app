/*
  Warnings:

  - You are about to drop the column `properties` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "properties";

-- CreateTable
CREATE TABLE "FavoriteProperty" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "propertyId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "price" JSON NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" TEXT NOT NULL,
    "square_feet" INTEGER NOT NULL,
    "address" JSON NOT NULL,
    "favoritesId" UUID NOT NULL,

    CONSTRAINT "FavoriteProperty_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteProperty" ADD CONSTRAINT "FavoriteProperty_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;
