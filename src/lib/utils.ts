import { Property } from '@/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  insertPropertySchema,
  LocationSchema,
  LotSizeSchema,
  PriceSchema,
} from './validators';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// Convert prisma object into a plain JS object
export function convertToPlainObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

// Format number with decimal places
export function formatNumberWithDecimal(value: number): string {
  const [int, decimal] = value.toString().split('.');

  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : int;
}

export function transformProperty(property: Property): Property {
  return {
    ...property,
    location: LocationSchema.parse(property.location) || {
      street: '',
      city: '',
      state: '',
      zipcode: '',
      coordinates: {},
    },
    lot_size: LotSizeSchema.parse(property.lot_size) || {
      square_feet: 0,
      acre: 0,
    },
    mls_id: insertPropertySchema.shape.mls_id.parse(property.mls_id),
    commission_type: insertPropertySchema.shape.commission_type.parse(
      property.commission_type,
    ),
    commission: insertPropertySchema.shape.commission.parse(
      property.commission,
    ),
    commission_description:
      insertPropertySchema.shape.commission_description.parse(
        property.commission_description,
      ),
    price: PriceSchema.parse(property.price),
  };
}
