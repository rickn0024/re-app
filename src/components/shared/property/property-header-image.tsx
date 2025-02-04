'use client';
import { useRef } from 'react';
import Image from 'next/image';
import { ExpandIcon } from 'lucide-react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { Button } from '@/components/ui/button';

interface PropertyHeaderImageProps {
  property: {
    status: string;
    images: string[];
  };
}

export default function PropertyHeaderImage({
  property,
}: PropertyHeaderImageProps) {
  const status = property?.status;

  // Set the number of images to display in the grid
  const displayImages = property?.images?.slice(0, 3) || [];
  const allImages = property?.images || []; // Full list of images for the gallery

  // Reference to open the gallery programmatically
  const openGalleryRef = useRef<((e: MouseEvent) => void) | null>(null);

  const handleOpenGallery = () => {
    if (openGalleryRef.current) {
      openGalleryRef.current(new MouseEvent('click')); // Trigger gallery opening
    }
  };

  return (
    <Gallery>
      <section>
        <div className="container-xl m-auto">
          <div className="container m-auto relative">
            <div className="container m-auto relative">
              <span className="absolute top-6 left-6 bg-brandBlue text-white px-4 py-2 rounded-md text-sm shadow">
                {status}
              </span>
            </div>

            {/* Display only the first 5 images in the grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4">
              {displayImages.map((image, index) => (
                <div
                  key={index}
                  className={`${index === 0 ? 'col-span-2 row-span-2' : ''}`}
                >
                  <Item
                    original={image}
                    thumbnail={image}
                    width="1024"
                    height="768"
                  >
                    {({ ref, open }) => {
                      // Store the open function for programmatic opening
                      if (index === 0) {
                        openGalleryRef.current = open as unknown as (
                          e: MouseEvent,
                        ) => void;
                      }

                      return (
                        <Image
                          src={image}
                          ref={ref}
                          onClick={open} // Opens the gallery on image click
                          alt=""
                          className={`object-cover w-full cursor-pointer ${
                            index === 0 ? ' h-[446px]' : ' h-[215px]'
                          }`}
                          width={0}
                          height={0}
                          sizes="(min-width: 1280px) 768px, (min-width: 1024px) 60vw, (min-width: 900px) 60vw, (min-width: 768px) 55vw, 100vw"
                          priority={true}
                        />
                      );
                    }}
                  </Item>
                </div>
              ))}
            </div>

            <div className="container m-auto relative">
              <Button
                className="absolute bottom-6 right-6 bg-brandYellow text-gray-900 hover:bg-brandYellow/80"
                onClick={handleOpenGallery} // Open the gallery for all images
              >
                {allImages.length} Photos
                <ExpandIcon size="20" className="ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Render hidden gallery items only if there are more than 5 images */}
        {allImages.length > 3 &&
          allImages.slice(3).map((image, index) => (
            <Item
              key={`gallery-${index + 3}`}
              original={image}
              thumbnail={image}
              width="1024"
              height="768"
            >
              {({ ref }) => (
                <div style={{ display: 'none' }}>
                  <Image
                    src={image}
                    ref={ref}
                    alt=""
                    width={0}
                    height={0}
                    sizes="(min-width: 1280px) 768px, (min-width: 1024px) 60vw, (min-width: 900px) 60vw, (min-width: 768px) 55vw, 100vw"
                  />
                </div>
              )}
            </Item>
          ))}
      </section>
    </Gallery>
  );
}
