import { z } from 'zod';
import { formatNumberWithDecimal } from './utils';

// Decimal validation (Ensures exactly two decimal places)
const decimalNumbers = z
  .string()
  .refine(
    value => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Must have exactly 2 decimal places',
  );

// Coordinates schema
const CoordinatesSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
});

// Location schema
const LocationSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  neighborhood: z.string().optional(),
  coordinates: CoordinatesSchema.optional(),
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

// Schema for sign in
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Schema for sign up
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

// Schema for updating user profile
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters long'),
  email: z.string().email('Invalid email address'),
});

// Schema to update users
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'ID is required'),
  role: z.string().min(1, 'Role is required'),
});

// Favorite property schema
export const FavoritePropertySchema = z.object({
  propertyId: z.string().min(1, 'Property is required'),
  slug: z.string().min(1, 'Slug is required'),
  headline: z.string().min(1, 'Headline is required'),
  image: z.string().min(1, 'Image is required'),
  type: z.string(),
  price: PriceSchema,
  beds: z.number().min(1, 'Beds is required'),
  baths: decimalNumbers,
  square_feet: z.number().min(1, 'Square feet is required'),
  address: LocationSchema,
});

export const insertFavoriteSchema = z.object({
  properties: z.array(FavoritePropertySchema),
  sessionFavoritesId: z.string().min(1, 'Session cart ID is required'),
  userId: z.string().optional().nullable(),
});
