import { PrismaClient } from '@prisma/client';
import samplePropertyData from './properties';

async function main() {
  const prisma = new PrismaClient();
  await prisma.property.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();
  await prisma.agentProfile.deleteMany();

  await prisma.property.createMany({ data: samplePropertyData.properties });
  await prisma.user.createMany({ data: samplePropertyData.users });
  await prisma.agentProfile.createMany({ data: samplePropertyData.agents });

  console.log('Seeding complete');
}

main();
