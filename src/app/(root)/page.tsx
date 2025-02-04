import PropertyList from '@/components/shared/property/property-list';
import { getLatestProperties } from '@/lib/actions/property.actions';

export default async function Home() {
  const latestProperties = await getLatestProperties();
  return (
    <>
      <PropertyList data={latestProperties} title="Latest Listings" limit={4} />
    </>
  );
}
