import * as z from 'zod';
import {
  insertFavoriteSchema,
  insertPropertySchema,
  FavoritePropertySchema,
} from '@/lib/validators';

export type Property = z.infer<typeof insertPropertySchema> & {
  id: string;
  created_at: Date;
  updated_at: Date;
};

export type Favorites = z.infer<typeof insertFavoriteSchema>;
export type FavoriteProperty = z.infer<typeof FavoritePropertySchema>;
