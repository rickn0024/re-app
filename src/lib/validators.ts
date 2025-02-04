import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

// Decimal validation (Ensures exactly two decimal places)
const decimalNumbers = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Must have exactly 2 decimal places',
  );

// Location schema
const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

const LocationSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  neighborhood: z.string(),
  coordinates: CoordinatesSchema,
});

// Lot size schema
const LotSizeSchema = z.object({
  square_feet: z.number().nullable(),
  acre: z.number().nullable(),
});

// Price schema
const PriceSchema = z.object({
  list_price: z.number().nullable(),
  lease_price: z.number().nullable(),
});

// Commission schema
const CommissionSchema = z.object({
  percentage: z.number().nullable(),
  flat_fee: z.number().nullable(),
});

// Main property validation schema
export const insertPropertySchema = z.object({
  listing_agent: z.string(),
  headline: z.string(),
  slug: z.string(),
  type: z.string(),
  mls_id: z.string().nullable(),
  status: z.string(),
  listing_date: z.string().datetime(),
  description: z.string(),
  location: LocationSchema,
  beds: z.number(),
  baths: decimalNumbers,
  square_feet: z.number(),
  lot_size_units: z.string(),
  lot_size: LotSizeSchema,
  year_built: z.number(),
  amenities: z.array(z.string()),
  price: PriceSchema,
  commission_type: z.string().nullable(),
  commission: CommissionSchema.nullable(),
  commission_description: z.string().nullable(),
  images: z.array(z.string()),
  is_featured: z.boolean(),
});
