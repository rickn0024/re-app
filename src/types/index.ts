import * as z from 'zod';
import { insertPropertySchema } from '@/lib/validators';

export type Property = z.infer<typeof insertPropertySchema> & {
  id: string;
  created_at: Date;
  updated_at: Date;
};
