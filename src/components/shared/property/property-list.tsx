import React from 'react';
import PropertyCard from './property-card';
import { Property } from '@/types';

export default function PropertyList({
  data,
  title,
  limit,
}: {
  data: Property[];
  title?: string;
  limit?: number;
}) {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {limitedData.map((property: Property, index: number) => (
            <PropertyCard key={index} property={property} />
          ))}
        </div>
      ) : (
        <div>
          <p>No properties found</p>
        </div>
      )}
    </div>
  );
}
