import { getPropertyBySlug } from '@/lib/actions/property.actions';
import Image from 'next/image';

interface PropertyImageGalleryProps {
  slug: string;
}

export default async function PropertyImageGallery({
  slug,
}: PropertyImageGalleryProps) {
  const property = await getPropertyBySlug(slug);
  const images = property?.images;
  const status = property?.status;

  return (
    <section className="bg-gray-900 p-4">
      <div className="container mx-auto">
        <div className="container m-auto relative">
          <span className="absolute top-6 left-6 bg-blue-500 text-white px-4 py-2 rounded-md text-sm shadow">
            {status}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-2 gap-4">
          {images?.slice(0, 5).map((image, index) => (
            <div
              key={index}
              className={`${index === 0 ? 'col-span-2 row-span-2' : ''}`}
            >
              <Image
                src={image}
                alt=""
                className={`object-cover w-full${
                  index === 0 ? ' h-[446px]' : ' h-[215px]'
                }`}
                width={0}
                height={0}
                sizes="(min-width: 1280px) 768px, (min-width: 1024px) 60vw, (min-width: 900px) 60vw, (min-width: 768px) 55vw, 100vw"
                priority={true}
              />
            </div>
          ))}
          {images &&
            [...Array(Math.max(5 - images?.length, 0))].map((_, index) => (
              <div key={index + images?.length} className="hidden lg:block">
                <Image
                  src="/images/properties/noImage.jpg"
                  alt=""
                  className="object-cover w-full h-[215px]"
                  width={0}
                  height={0}
                  sizes="(min-width: 1280px) 384px, (min-width: 1024px) 30vw, (min-width: 900px) 30vw, (min-width: 768px) 55vw, (min-width: 550px) 50vw, 100vw"
                  priority={true}
                />
              </div>
            ))}
        </div>
        <div className="container m-auto relative">
          <button className="absolute bottom-6 right-6 bg-gray-300 px-4 py-2 rounded-md text-sm shadow hover:bg-gray-400">
            View more photos
          </button>
        </div>
      </div>
    </section>
  );
}
