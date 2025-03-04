import Loading from '@/components/loading';
import PropertyList from '@/components/shared/property/property-list';
import { getLatestProperties } from '@/lib/actions/property.actions';
import { Suspense } from 'react';

export default async function Home() {
  const latestProperties = await getLatestProperties();
  return (
    <>
      <Suspense fallback={<Loading />}>
        <PropertyList
          data={latestProperties}
          title="Latest Listings"
          limit={4}
        />
      </Suspense>
    </>
  );
}
