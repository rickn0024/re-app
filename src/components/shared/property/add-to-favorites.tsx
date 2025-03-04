'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Heart, Loader } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { FavoriteProperty } from '@/types';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/lib/actions/favorites.actions';
import { useTransition } from 'react';

export default function AddToFavorites({
  favorites,
  property,
}: {
  property: FavoriteProperty;
  favorites?: {
    sessionFavoritesId: string;
    favoriteProperties: FavoriteProperty[];
    userId?: string;
  };
}) {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const handleAddToFavorites = async () => {
    startTransition(async () => {
      const res = await addToFavorites(property);
      if (!res.success) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: res.message,
        });
      }
      // Handle success adding to favorites
      toast({
        variant: 'default',
        title: 'Success!',
        description: res.message,
        action: (
          <ToastAction
            className="bg-primary text-white hover:bg-gray-800"
            altText="Go to Favorites"
            onClick={() => router.push('/favorites')}
          >
            View Favorites
          </ToastAction>
        ),
      });
    });
  };

  const handleRemoveFromFavorites = async () => {
    startTransition(async () => {
      const res = await removeFromFavorites(property.propertyId);
      if (!res.success) {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: res.message,
        });
      }
      // Handle success removing from favorites
      toast({
        variant: 'default',
        title: 'Success!',
        description: res.message,
      });
    });
  };

  // Check if the property is already in favorites
  const isFavorite =
    favorites &&
    favorites.favoriteProperties.find(
      x => x.propertyId === property.propertyId,
    );
  // const isFavorite =
  //   favorites &&
  //   favorites.properties && // Ensure properties is defined
  //   favorites.properties.find(x => x.propertyId === property.propertyId);

  return isFavorite ? (
    <Button
      type="button"
      variant="ghost"
      onClick={handleRemoveFromFavorites}
      className="absolute top-1 right-2 h-6 w-6  text-white hover:text-white hover:bg-transparent"
    >
      {isPending ? (
        <Loader className="min-h-4 min-w-4 animate-spin" color="#fff" />
      ) : (
        <Heart fill="#ef4444" strokeWidth={0} className="min-h-6 min-w-6" />
      )}
    </Button>
  ) : (
    <Button
      type="button"
      variant="ghost"
      onClick={handleAddToFavorites}
      className="absolute top-1 right-2 h-6 w-6 text-white hover:text-red-500 hover:bg-transparent"
    >
      {isPending ? (
        <Loader className="min-h-4 min-w-4 animate-spin" color="#fff" />
      ) : (
        <Heart className="min-h-6 min-w-6" />
      )}
    </Button>
  );
}
