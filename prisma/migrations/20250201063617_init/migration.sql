-- CreateTable
CREATE TABLE "Property" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "mls_id" TEXT,
    "status" TEXT NOT NULL,
    "listing_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "location" JSONB NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" DECIMAL(2,2) NOT NULL,
    "square_feet" INTEGER NOT NULL,
    "lot_size_units" TEXT NOT NULL,
    "lot_size" JSONB NOT NULL,
    "year_built" INTEGER NOT NULL,
    "amenities" TEXT[],
    "commission_type" TEXT,
    "commission" JSONB,
    "commission_description" TEXT,
    "image" TEXT[],
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "listing_agent" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "property_slug_idx" ON "Property"("slug");
