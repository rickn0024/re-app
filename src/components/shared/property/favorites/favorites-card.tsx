import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, BathIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { FavoriteProperty } from '@/types';
import AddToFavorites from '../add-to-favorites';
import { getMyFavorites } from '@/lib/actions/favorites.actions';

export default async function FavoritesCard({
  property,
}: {
  property: FavoriteProperty; // Accept a single FavoriteProperty object
}) {
  if (property.type === 'Single Family Residence') {
    property.type = 'SFR';
  }
  if (property.type === 'Condominium') {
    property.type = 'Condo';
  }

  const favorites = await getMyFavorites();

  // Transform favoriteProperties to match the expected type
  const transformedFavorites = favorites
    ? {
        ...favorites,
        userId: favorites.userId || undefined,
        favoriteProperties: favorites.favoriteProperties.map(fp => ({
          ...fp,
          price: fp.price as {
            list_price: number | null;
            lease_price: number | null;
          },
          address: fp.address as {
            street: string;
            city: string;
            state: string;
            zipcode: string;
          },
        })),
      }
    : undefined;

  return (
    <Card className="hover:shadow-lg hover:border cursor-pointer shadow-md rounded-lg">
      <CardHeader className="relative p-0">
        <Link href={`/property/${property.slug}`}>
          <Image
            src={property.image}
            alt={property.headline}
            width={800}
            height={300}
            className="rounded-t-lg object-cover aspect-[16/9]"
          />
        </Link>
        <Badge
          className={`absolute top-1 left-2 rounded-full ${
            property.type === 'SFR' && 'bg-secondary/80'
          } ${property.type === 'Condo' && 'bg-primary/80'} ${
            property.type === 'Townhouse' && 'bg-primary/80'
          } ${property.type === 'Land' && 'bg-purple-600/80'}`}
        >
          {property.type}
        </Badge>
        <AddToFavorites
          favorites={transformedFavorites}
          property={property as unknown as FavoriteProperty}
        />
      </CardHeader>
      <Link href={`/property/${property.slug}`}>
        <CardContent className="p-0 dark:bg-muted">
          <div className="flex flex-col gap-2 p-3 w-full">
            <h2 className="font-bold text-xl">
              $
              {property.price?.list_price
                ? property.price?.list_price?.toLocaleString()
                : property.price?.lease_price?.toLocaleString()}
            </h2>
            <h2 className="flex gap-4 items-center text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-6 w-6 text-gray-500" />
              {property.address?.street}, {property.address?.city},{' '}
              {property.address?.state} {property.address?.zipcode}
            </h2>
            <div className="flex gap-2 mt-2 justify-between">
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center dark:bg-background">
                <BedDouble className="h-5 w-5 text-gray-500" />
                {property.beds}
              </h2>
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center dark:bg-background">
                <BathIcon className="h-5 w-5 text-gray-500" />
                {property.baths}
              </h2>
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center dark:bg-background">
                <BedDouble className="h-5 w-5 text-gray-500" />
                {property.square_feet?.toLocaleString()}
              </h2>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
