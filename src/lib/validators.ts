import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const decimalNumbers = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Must have exactly 2 decimal places',
  );

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

const LotSizeSchema = z.object({
  square_feet: z.number().nullable(),
  acre: z.number().nullable(),
});

const PriceSchema = z.object({
  list_price: z.number().nullable(),
  lease_price: z.number().nullable(),
});

const CommissionSchema = z.object({
  percentage: z.number().nullable(),
  flat_fee: z.number().nullable(),
});

export const insertPropertySchema = z.object({
  listing_agent: z.string(),
  headline: z.string(),
  slug: z.string(),
  type: z.string(),
  mls_id: z.string(),
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
  commission_type: z.string(),
  commission: CommissionSchema,
  commission_description: z.string(),
  images: z.array(z.string()),
  is_featured: z.boolean(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
