import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends PrismaClient with custom field formatting
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    property: {
      baths: {
        compute(property) {
          return property.baths.toString();
        },
      },

      listing_date: {
        compute(property: { listing_date: string }): string {
          return new Date(property.listing_date).toLocaleDateString();
        },
      },

      price: {
        compute(property) {
          const price = property.price as {
            list_price: number | null;
            lease_price: number | null;
          };
          return {
            list_price: price.list_price ?? null,
            lease_price: price.lease_price ?? null,
          };
        },
      },

      location: {
        compute(property) {
          // Type assertion assuming location is an object with the expected properties
          const location = property.location as {
            coordinates: { latitude: number; longitude: number };
            street: string;
            city: string;
            state: string;
            zipcode: string;
            neighborhood: string;
          };

          return {
            coordinates: location.coordinates ?? { latitude: 0, longitude: 0 },
            street: location.street ?? '',
            city: location.city ?? '',
            state: location.state ?? '',
            zipcode: location.zipcode ?? '',
            neighborhood: location.neighborhood ?? '',
          };
        },
      },

      lot_size: {
        compute(property) {
          // Type assertion assuming lot_size is an object with the expected properties
          const lotSize = property.lot_size as {
            square_feet: number | null;
            acre: number | null;
          };

          return {
            square_feet: lotSize.square_feet ?? null,
            acre: lotSize.acre ?? null,
          };
        },
      },

      commission: {
        compute(property) {
          // Type assertion assuming commission is an object with the expected properties
          const commission = property.commission as {
            percentage: number | null;
            flat_fee: number | null;
          };

          return {
            percentage: commission.percentage ?? null,
            flat_fee: commission.flat_fee ?? null,
          };
        },
      },
    },
  },
});

// // Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
// export const prisma = new PrismaClient({ adapter }).$extends({
//   result: {
//     property: {
//       baths: {
//         compute(property) {
//           return property.baths.toString();
//         },
//       },
//       // lot_size: {
//       //   acre: {
//       //     compute(property: { lot_size: { acre: number } }): string {
//       //       return property.lot_size.acre.toString();
//       //     },
//       //   },
//       // },
//       // commission: {
//       //   percentage: {
//       //     compute(property: { commission: { percentage: number } }): string {
//       //       return property.commission.percentage.toString();
//       //     },
//       //   },
//       // },
//       listing_date: {
//         compute(property: { listing_date: string }): string {
//           return new Date(property.listing_date).toLocaleDateString();
//         },
//       },
//     },
//   },
// });
