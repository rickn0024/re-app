/*
  Warnings:

  - You are about to drop the `_FavoritesToProperty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavoritesToProperty" DROP CONSTRAINT "_FavoritesToProperty_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesToProperty" DROP CONSTRAINT "_FavoritesToProperty_B_fkey";

-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "properties" JSON[] DEFAULT ARRAY[]::JSON[];

-- DropTable
DROP TABLE "_FavoritesToProperty";
