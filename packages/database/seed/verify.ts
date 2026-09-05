import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Verifying seed...');
  const divisions = await prisma.division.count();
  const districts = await prisma.district.count();
  const markets = await prisma.market.count();
  const items = await prisma.item.count();

  console.log(`Found ${divisions} divisions, ${districts} districts, ${markets} markets, ${items} items.`);

  if (divisions === 0 || districts === 0 || markets === 0 || items === 0) {
    throw new Error('Seed verification failed. Some tables are empty.');
  }

  console.log('Seed verification passed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
