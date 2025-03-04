import React from 'react';
import FavoritesCard from './favorites-card';

type FavoriteProperty = {
  baths: string;
  price: { list_price: number | null; lease_price: number | null };
  slug: string;
  headline: string;
  type: string;
  beds: number;
  square_feet: number;
  propertyId: string;
  image: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipcode: string;
    neighborhood?: string;
    coordinates?: { latitude: number; longitude: number };
  };
};

type FavoritesData = {
  sessionFavoritesId: string;
  userId?: string;
  properties: FavoriteProperty[];
};

export default function FavoritesList({
  data,
  title,
  limit,
}: {
  data: FavoritesData[];
  title?: string;
  limit?: number;
}) {
  // Flatten the properties array from all FavoritesData objects
  const allProperties = data.flatMap(favorites => favorites.properties);

  // Apply the limit if provided
  const limitedProperties = limit
    ? allProperties.slice(0, limit)
    : allProperties;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {limitedProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {limitedProperties.map(
            (property: FavoriteProperty, index: number) => (
              <FavoritesCard key={index} property={property} />
            ),
          )}
        </div>
      ) : (
        <div>
          <p>No properties found</p>
        </div>
      )}
    </div>
  );
}
