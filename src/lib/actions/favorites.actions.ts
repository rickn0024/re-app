'use server';

import { FavoriteProperty } from '@/types';
import { cookies } from 'next/headers';
import { convertToPlainObject, formatErrors } from '../utils';
import { auth } from '@/auth';
import { prisma } from '@/db/prisma';
import { FavoritePropertySchema } from '../validators';
import { revalidatePath } from 'next/cache';

export async function addToFavorites(data: FavoriteProperty) {
  try {
    // Get the user's favorites from the cookie
    const sessionFavoritesId = (await cookies()).get(
      'sessionFavoritesId',
    )?.value;
    if (!sessionFavoritesId) throw new Error('Favorites session not found');

    // Get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get favorites
    const favorites = await getMyFavorites();

    // Parse and validate the property
    const property = FavoritePropertySchema.parse(data);

    // Find the property in the database
    const favoriteProperty = await prisma.property.findFirst({
      where: {
        id: property.propertyId,
      },
    });

    // Check if the property exists
    if (!favoriteProperty) {
      throw new Error('Property not found');
    }

    if (!favorites) {
      // Create a new favorite object
      await prisma.favorites.create({
        data: {
          sessionFavoritesId: sessionFavoritesId,
          userId: userId,
          favoriteProperties: {
            create: [property], // Create a new FavoriteProperty record
          },
        },
      });

      // Revalidate the page
      revalidatePath('/', 'layout');

      return {
        success: true,
        message: `${favoriteProperty.location.street} added to favorites`,
      };
    } else {
      // If favorites already exist, add the property to the existing list
      await prisma.favoriteProperty.create({
        data: {
          ...property,
          favoritesId: favorites.id,
        },
      });

      // Revalidate the page
      revalidatePath('/', 'layout');

      return {
        success: true,
        message: `${favoriteProperty.location.street} added to favorites`,
      };
    }
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}

export async function getMyFavorites() {
  try {
    // Get the user's favorites from the cookie
    const sessionFavoritesId = (await cookies()).get(
      'sessionFavoritesId',
    )?.value;
    if (!sessionFavoritesId) throw new Error('Favorites session not found');

    // Get session user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get favorites from the database
    const favorites = await prisma.favorites.findFirst({
      where: userId
        ? { userId: userId }
        : { sessionFavoritesId: sessionFavoritesId },
      include: {
        favoriteProperties: true, // Include the FavoriteProperty records
      },
    });

    if (!favorites) {
      return undefined;
    }

    // Convert the decimals and return
    return convertToPlainObject(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    return null;
  }
}

export async function removeFromFavorites(propertyId: string) {
  try {
    // Get the user's favorites from the cookie
    const sessionFavoritesId = (await cookies()).get(
      'sessionFavoritesId',
    )?.value;
    if (!sessionFavoritesId) throw new Error('Favorites session not found');

    // Get the property
    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      throw new Error('Property not found');
    }

    // Get user favorites
    const favorites = await getMyFavorites();

    if (!favorites) {
      throw new Error('Favorites not found');
    }

    const existingFavorite = favorites.favoriteProperties.find(
      x => x.propertyId === propertyId,
    );

    if (!existingFavorite) {
      throw new Error('Property not found in favorites');
    }

    // Find the FavoriteProperty record to delete
    const favoriteProperty = await prisma.favoriteProperty.findFirst({
      where: {
        favoritesId: favorites.id,
        propertyId: propertyId,
      },
    });

    if (!favoriteProperty) {
      throw new Error('Property not found in favorites');
    }

    // Delete the FavoriteProperty record
    await prisma.favoriteProperty.delete({
      where: {
        id: favoriteProperty.id,
      },
    });

    // Revalidate the page
    revalidatePath('/', 'layout');

    return {
      success: true,
      message: `Property removed from favorites`,
    };
  } catch (error) {
    return {
      success: false,
      message: formatErrors(error),
    };
  }
}
