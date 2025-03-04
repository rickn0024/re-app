/*
  Warnings:

  - You are about to drop the column `properties` on the `Favorites` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Favorites" DROP COLUMN "properties";

-- CreateTable
CREATE TABLE "_FavoritesToProperty" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_FavoritesToProperty_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavoritesToProperty_B_index" ON "_FavoritesToProperty"("B");

-- AddForeignKey
ALTER TABLE "_FavoritesToProperty" ADD CONSTRAINT "_FavoritesToProperty_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorites"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesToProperty" ADD CONSTRAINT "_FavoritesToProperty_B_fkey" FOREIGN KEY ("B") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;
