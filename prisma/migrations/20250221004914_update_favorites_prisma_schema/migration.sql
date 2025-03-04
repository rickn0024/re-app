-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "properties" JSON[] DEFAULT ARRAY[]::JSON[];
