import Image from 'next/image';
import Link from 'next/link';
import { BedDouble, BathIcon, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Property } from '@/types';

export default function PropertyCard({ property }: { property: Property }) {
  if (property.type === 'Single Family Residence') {
    property.type = 'SFR';
  }
  if (property.type === 'Condominium') {
    property.type = 'Condo';
  }
  return (
    <Link href={`/property/${property.slug}`}>
      <Card className="hover:shadow-lg hover:border cursor-pointer shadow-md rounded-lg">
        <CardHeader className="relative p-0">
          <Image
            src={property.images[0]}
            alt={property.headline}
            width={800}
            height={300}
            className="rounded-t-lg object-cover aspect-[16/9]"
          />
          <Badge
            className={`absolute top-2 left-2 rounded-full ${
              property.type === 'SFR' && 'bg-secondary/80'
            } ${property.type === 'Condo' && 'bg-primary/80'} ${
              property.type === 'Townhouse' && 'bg-primary/80'
            } ${property.type === 'Land' && 'bg-purple-600/80'}`}
          >
            {property.type}
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-2 p-3 w-full">
            <h2 className="font-bold text-xl">
              ${property.price?.list_price?.toLocaleString()}
            </h2>
            <h2 className="flex gap-4 items-center text-sm text-gray-500">
              <MapPin className="h-6 w-6 text-gray-500" />
              {property.location?.street}, {property.location?.city},{' '}
              {property.location?.state} {property.location?.zipcode}
            </h2>
            <div className="flex gap-2 mt-2 justify-between">
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center">
                <BedDouble className="h-5 w-5 text-gray-500" />
                {property.beds}
              </h2>
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center">
                <BathIcon className="h-5 w-5 text-gray-500" />
                {property.baths}
              </h2>
              <h2 className="flex gap-2 w-full items-center bg-slate-100 text-gray-500 rounded-md p-2 justify-center">
                <BedDouble className="h-5 w-5 text-gray-500" />
                {property.square_feet?.toLocaleString()}
              </h2>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
