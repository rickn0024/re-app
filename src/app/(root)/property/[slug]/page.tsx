import PropertyDetails from '@/components/shared/property/property-details';
import PropertyHeaderImage from '@/components/shared/property/property-header-image';
import { Button } from '@/components/ui/button';
import { getPropertyBySlug } from '@/lib/actions/property.actions';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function PropertyPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;

  const property = await getPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <>
      <PropertyHeaderImage property={property} />
      <section>
        <div className=" m-auto py-6 ">
          <Button asChild variant="outline" className="">
            <Link href="/properties" className="flex items-center">
              <ArrowLeft className="mr-2 w-4 h-4" /> Back to Properties
            </Link>
          </Button>
        </div>
      </section>
      <section className="">
        <div className=" m-auto py-10 ">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <div>
              <h2 className="h3-bold mb-4">Property Details</h2>
              <PropertyDetails slug={slug} />
            </div>
            <div className="relative">
              <aside className="space-y-4 sticky top-16">
                {/* <BookmarkButton property={property} />
            <ShareButtons property={property} />
            <PropertyContactForm property={property} /> */}
              </aside>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
