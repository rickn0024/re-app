import { PrismaClient } from '@prisma/client';
import samplePropertyData from './properties';

async function main() {
  const prisma = new PrismaClient();
  await prisma.property.deleteMany();

  await prisma.property.createMany({ data: samplePropertyData.properties });

  console.log('Seeding complete');
}

main();
