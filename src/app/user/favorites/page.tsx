import { Suspense } from 'react';
import Loading from '@/components/loading';
import { getMyFavorites } from '@/lib/actions/favorites.actions';
import FavoritesList from '@/components/shared/property/favorites/favorites-list';

export default async function FavoritesPage() {
  const favoriteProperties = await getMyFavorites();

  // Transform favoriteProperties to match the expected structure
  const transformedFavorites = favoriteProperties
    ? [
        {
          sessionFavoritesId: favoriteProperties.sessionFavoritesId,
          userId: favoriteProperties.userId || undefined,
          properties: favoriteProperties.favoriteProperties.map(fp => ({
            baths: fp.baths,
            price: fp.price as {
              list_price: number | null;
              lease_price: number | null;
            },
            slug: fp.slug,
            headline: fp.headline,
            type: fp.type,
            beds: fp.beds,
            square_feet: fp.square_feet,
            propertyId: fp.propertyId,
            image: fp.image,
            address: fp.address as {
              street: string;
              city: string;
              state: string;
              zipcode: string;
              neighborhood?: string;
              coordinates?: { latitude: number; longitude: number };
            },
          })),
        },
      ]
    : [];

  return (
    <>
      {!transformedFavorites && <p>No favorite properties found.</p>}
      <Suspense fallback={<Loading />}>
        <FavoritesList
          data={transformedFavorites}
          title="My Favorites"
          limit={4}
        />
      </Suspense>
    </>
  );
}
