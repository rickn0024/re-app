'use server';

import { prisma } from '@/db/prisma';
import { LASTEST_PROPERTIES_LIMIT } from '../constants';
import { convertToPlainObject } from '../utils';

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

    return convertToPlainObject(data);
  } catch (error) {
    console.error('Error fetching or parsing properties:', error);
    throw new Error('Failed to fetch properties');
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client
  }
}
