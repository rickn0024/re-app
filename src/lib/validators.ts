import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

const decimalNumbers = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Must have exactly 2 decimal places',
  );

// Schema for the `price` field (JSON)
export const PriceSchema = z
  .object({
    list_price: z.number().positive().optional(),
    lease_price: z.number().positive().optional(),
  })
  .nullable(); // Allow the entire object to be null

// Schema for the `location` field (JSON)
export const LocationSchema = z
  .object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipcode: z.string().min(1),
    neighboorhood: z.string().optional(), // Optional field
    coordinates: z.object({
      latitude: z.number().optional(),
      longitude: z.number().optional(),
    }),
  })
  .nullable(); // Allow the entire object to be null

// Schema for the `lot_size` field (JSON)
export const LotSizeSchema = z
  .object({
    square_feet: z.number().positive().optional(), // Ensure this is a number
    acre: z.number().positive().optional(), // Ensure this is a number
  })
  .nullable(); // Allow the entire object to be null

// Schema for the `commission` field (JSON)
const CommissionSchema = z
  .object({
    percentage: z.number().positive().optional(),
    fixed: z.number().positive().optional(),
  })
  .nullable()
  .optional()
  .transform(val => val ?? undefined); // Handle null and transform to undefined

// Schema for inserting properties
export const insertPropertySchema = z.object({
  slug: z.string().min(1), // Unique slug for the property
  headline: z.string().min(3, 'Headline must have at least 3 characters'), // Headline for the property
  type: z.string().min(1, 'Must select property type'), // Property type (e.g., "House", "Apartment")
  mls_id: z
    .string()
    .nullable()
    .optional()
    .transform(val => val ?? undefined), // Handle null and transform to undefined  status: z.string().min(1, 'Must select property status'), // Listing status (e.g., "active", "sold")
  description: z.string().min(10, 'Description must be at least 10 characters'), // Property description
  price: PriceSchema, // Price object (amount and currency)
  location: LocationSchema, // Location object (address, city, state, etc.)
  beds: z.coerce.number().int().positive(), // Number of bedrooms
  baths: decimalNumbers, // Number of bathrooms
  square_feet: z.coerce.number().int().positive(), // Square footage
  lot_size_units: z.string().min(1, 'Must select lot size unit of measurement'), // Lot size units (e.g., "acres", "sqft")
  lot_size: LotSizeSchema, // Lot size object (value and unit)
  year_built: z.coerce.number().int().positive(), // Year the property was built
  amenities: z.array(z.string().min(1, 'Must select at least 1 ammenity')), // Array of amenities
  commission_type: z
    .string()
    .nullable()
    .optional()
    .transform(val => val ?? undefined), // Handle null and transform to undefined
  commission: CommissionSchema, // Use the updated CommissionSchema
  commission_description: z
    .string()
    .nullable()
    .optional()
    .transform(val => val ?? undefined),
  is_featured: z.boolean().default(false), // Whether the property is featured
  listing_agent: z
    .string()
    .min(1, 'Property must be attached to a listing agent'), // ID of the listing agent
  images: z.array(z.string().min(1)), // Array of image URLs
});
