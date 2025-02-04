import {
  BathIcon,
  BedDouble,
  Calendar,
  CheckIcon,
  Drill,
  Hash,
  HomeIcon,
  LandPlotIcon,
  MapIcon,
  RulerIcon,
  XIcon,
} from 'lucide-react';
import { getPropertyBySlug } from '@/lib/actions/property.actions';

interface PropertyDetailsProps {
  slug: string;
}

export default async function PropertyDetails({ slug }: PropertyDetailsProps) {
  const property = await getPropertyBySlug(slug);

  function getCommissionDisplay() {
    if (property?.commission.percentage) {
      return `${property?.commission.percentage.toLocaleString()}%`;
    } else if (property?.commission.flat_fee) {
      return `$${property?.commission.flat_fee.toLocaleString()}`;
    }
  }
  function getPriceDisplay() {
    if (property?.price.list_price) {
      return `${property?.price.list_price.toLocaleString()}`;
    } else if (property?.price.lease_price) {
      return `${property?.price.lease_price.toLocaleString()}/mo`;
    }
  }
  function getLotDisplay() {
    // console.log(lot_size);
    if (property?.lot_size?.square_feet) {
      return `${property?.lot_size?.square_feet.toLocaleString()} sqft`;
    } else if (property?.lot_size?.acre) {
      return `${property?.lot_size?.acre.toLocaleString()} ac`;
    }
  }

  return (
    <main>
      <div className="p-6 rounded-lg text-left bg-gray-100 dark:bg-muted">
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex flex-col w-full">
            <span className="font-semibold text-2xl leading-9">
              ${getPriceDisplay()}
            </span>
            <h1 className="text-lg leading-8">
              {property?.location?.street}, {property?.location?.city},{' '}
              {property?.location?.state} {property?.location?.zipcode}
            </h1>
          </div>

          <div className="flex flex-col lg:items-end">
            <div className="flex flex-row items-end gap-8">
              <div className="flex flex-row items-center lg:flex-col lg:items-start">
                <BedDouble className="inline-flex lg:hidden w-4 h-4 mr-2" />
                <span className="font-semibold text-xl lg:text-2xl leading-9 block">
                  {property?.beds}
                </span>
                <span className="hidden lg:block font-normal text-base leading-8">
                  beds
                </span>
              </div>
              <div className="flex flex-row items-center lg:flex-col lg:items-start">
                <BathIcon className="inline-flex lg:hidden w-4 h-4 mr-2" />
                <span className="font-semibold text-xl lg:text-2xl leading-9 block">
                  {property?.baths}
                </span>
                <span className="hidden lg:block font-normal text-base leading-8">
                  baths
                </span>
              </div>
              <div className="flex flex-row items-center lg:flex-col lg:items-start">
                <RulerIcon className="inline-flex lg:hidden w-4 h-4 mr-2" />
                <span className="font-semibold text-xl lg:text-2xl leading-9 block">
                  {property?.square_feet.toLocaleString()}
                </span>
                <span className="hidden lg:block font-normal text-base leading-8">
                  sqft
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-lg dark:bg-muted">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <h2 className="text-3xl font-bold mb-4">{property?.headline}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <HomeIcon className="w-5 h-5" />
            {property?.type}
          </div>
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <Drill className="w-5 h-5" />
            Built in {property?.year_built}
          </div>
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <LandPlotIcon className="w-5 h-5" />
            {getLotDisplay()}
          </div>
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <Calendar className="w-5 h-5" />
            {property?.listing_date}
          </div>
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <MapIcon className="w-5 h-5" />
            {property?.location?.neighborhood
              ? property?.location?.neighborhood
              : 'No neighborhood provided'}
          </div>
          <div className="flex gap-2 items-center justify-center rounded-lg bg-gray-100 p-2">
            <Hash className="w-5 h-5" />
            {property?.mls_id ? property?.mls_id : 'Off-Market Listing'}
          </div>
        </div>
        <p className="text-gray-500 mt-8 text-center md:text-left leading-7 dark:text-gray-300">
          {property?.description != null
            ? property.description
            : 'No description provided'}
        </p>
      </div>

      <div className="p-6 rounded-lg dark:bg-muted">
        <h3 className="text-lg font-bold mb-4">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none">
          {property?.amenities?.map((amenity, index) => (
            <li key={index} className="flex items-center mb-3">
              <CheckIcon className="text-green-600 w-4 h-4 mr-2" /> {amenity}
            </li>
          ))}
        </ul>
      </div>
      {property?.commission && (
        <div>
          <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2 dark:bg-black rounded-lg">
            Offered Compensation
          </h3>
          <div className="flex flex-col md:flex-row justify-around">
            <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
              <div className="text-gray-500 mr-2 font-bold text-xl dark:text-white">
                Seller may consider offering up to:
              </div>
              <div className="text-4xl font-bold">
                {property?.commission ? (
                  <div className="text-gray-900 dark:text-brandYellow">
                    {getCommissionDisplay()}
                  </div>
                ) : (
                  <XIcon className="text-red-700" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center mb-4">
            <p className="text-gray-500 mb-0 dark:text-gray-300">
              {property?.commission_description != null
                ? property.commission_description
                : 'No commission description provided'}
            </p>
          </div>
        </div>
      )}
      {/* <div className="p-6 rounded-lg shadow-md mt-6 bg-gray-100 dark:bg-muted">
        {property?.location?.coordinates ? (
          <PropertyMap property={property} />
        ) : (
          'GPS Coordinates not found'
        )}
      </div> */}
    </main>
  );
}
