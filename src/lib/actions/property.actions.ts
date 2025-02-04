'use server';

import { prisma } from '@/db/prisma';
import { LASTEST_PROPERTIES_LIMIT } from '../constants';
import { convertToPlainObject } from '../utils';

// Fetch latest properties from the database
export async function getLatestProperties() {
  try {
    const data = await prisma.property.findMany({
      take: LASTEST_PROPERTIES_LIMIT,
      orderBy: { created_at: 'desc' },
    });

    return convertToPlainObject(data);
  } catch (error) {
    console.error('Error fetching properties:', error);
    throw new Error('Failed to fetch properties');
  }
}
