const samplePropertyData = {
  properties: [
    {
      listing_agent: '1',
      headline: 'Just listed! Beautiful 2 bedroom apartment near the commons',
      slug: '12345-main-street',
      type: 'Apartment',
      mls_id: 'SR240012354',
      status: 'Active',
      listing_date: '2024-01-08T00:00:00.000Z',
      description:
        'This is a beautiful apartment located near the commons. It is a 2 bedroom apartment with a full kitchen and bathroom. It is available for list_price or lease_price rentals.',
      location: {
        street: '12345 Main Street',
        city: 'Valencia',
        state: 'CA',
        zipcode: '91355',
        neighborhood: 'Valencia Northbridge',
        coordinates: {
          latitude: 34.4138,
          longitude: -118.5539,
        },
      },
      beds: 2,
      baths: 1,
      square_feet: 1500,
      lot_size_units: 'square_feet',
      lot_size: {
        square_feet: 5500,
        acre: null,
      },
      year_built: 1990,
      amenities: [
        'Wifi',
        'Full kitchen',
        'Washer & Dryer',
        'Free Parking',
        'Hot Tub',
        '24/7 Security',
        'Wheelchair Accessible',
        'Elevator Access',
        'Dishwasher',
        'Gym/Fitness Center',
        'Air Conditioning',
        'Balcony/Patio',
        'Smart TV',
        'Coffee Maker',
      ],
      price: {
        list_price: 100100,
        lease_price: null,
      },
      commission_type: 'percentage',
      commission: {
        percentage: 2.5,
        flat_fee: null,
      },
      commission_description: 'Seller is offering 2.5% commission.',
      images: [
        '/images/sample-properties/a1.jpg',
        '/images/sample-properties/a2.jpg',
        '/images/sample-properties/a3.jpg',
      ],
      is_featured: false,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
    },
  ],
};

export default samplePropertyData;
