import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Seed Divisions (Sample)
  const dhaka = await prisma.division.upsert({
    where: { code: 'BD-C' },
    update: {},
    create: { name_en: 'Dhaka', name_bn: 'ঢাকা', code: 'BD-C' },
  });

  const chittagong = await prisma.division.upsert({
    where: { code: 'BD-B' },
    update: {},
    create: { name_en: 'Chattogram', name_bn: 'চট্টগ্রাম', code: 'BD-B' },
  });

  // 2. Seed Districts (Sample)
  const dhakaDistrict = await prisma.district.upsert({
    where: { code: 'BD-13' },
    update: {},
    create: { division_id: dhaka.id, name_en: 'Dhaka', name_bn: 'ঢাকা', code: 'BD-13' },
  });

  // 3. Seed Areas (Sample Thanas)
  const tejgaon = await prisma.area.create({
    data: { district_id: dhakaDistrict.id, type: 'thana', name_en: 'Tejgaon', name_bn: 'তেজগাঁও' },
  });

  // 4. Seed Markets (Sample)
  await prisma.market.create({
    data: {
      area_id: tejgaon.id,
      name_en: 'Karwan Bazar',
      name_bn: 'কারওয়ান বাজার',
      aliases: ['Kawran Bazar', 'Karwanbazar'],
      lat: 23.7516,
      lng: 90.3933,
      market_type: 'mixed',
      opening_days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      status: 'active',
      verified: false,
    },
  });

  // 5. Seed Items (Sample)
  const rice = await prisma.item.create({
    data: {
      canonical_name_en: 'Rice',
      canonical_name_bn: 'চাল',
      category: 'staple',
      canonical_unit: 'kg',
      perishability_days: 365,
      is_tcb_tracked: true,
      is_dam_tracked: true,
    },
  });

  await prisma.itemVariant.create({
    data: {
      item_id: rice.id,
      name_en: 'Miniket',
      name_bn: 'মিনিকেট',
      grade: 'Premium',
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
