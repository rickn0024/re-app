'use server';

import { prisma } from '@/db/prisma';
import { LASTEST_PROPERTIES_LIMIT } from '../constants';
import { convertToPlainObject } from '../utils';
import {
  insertPropertySchema,
  LocationSchema,
  LotSizeSchema,
  PriceSchema,
} from '../validators';

// Get latest property data from the database
export async function getLatestProperties() {
  try {
    // Fetch raw data from the database
    const data = await prisma.property.findMany({
      take: LASTEST_PROPERTIES_LIMIT,
      orderBy: {
        created_at: 'desc',
      },
    });

    const transformedData = data.map(property => ({
      ...property,
      location: LocationSchema.parse(property.location) || {
        street: '',
        city: '',
        state: '',
        zipcode: '',
        coordinates: {},
      }, // Default value if null or invalid
      lot_size: LotSizeSchema.parse(property.lot_size) || {
        square_feet: 0,
        acre: 0,
      }, // Default value if null or invalid
      mls_id: insertPropertySchema.shape.mls_id.parse(property.mls_id), // Validate and parse the `mls_id` field
      commission_type: insertPropertySchema.shape.commission_type.parse(
        property.commission_type,
      ), // Validate and parse the `commission_type` field
      commission: insertPropertySchema.shape.commission.parse(
        property.commission,
      ), // Validate and parse the `commission` field
      commission_description:
        insertPropertySchema.shape.commission_description.parse(
          property.commission_description,
        ), // Validate and parse the `commission_description` field
      price: PriceSchema.parse(property.price),
    }));

    return convertToPlainObject(transformedData); // Convert to plain object
  } catch (error) {
    console.error('Error fetching or parsing properties:', error);
    throw new Error('Failed to fetch properties');
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
