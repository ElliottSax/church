const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding test data...\n');

  // Create test events
  console.log('Creating events...');
  await prisma.event.create({
    data: {
      title: 'Sunday Worship Service',
      slug: 'sunday-worship-service',
      description: 'Join us for weekly worship with inspiring music and messages.',
      category: 'worship',
      date: new Date('2026-02-08T10:00:00'),
      endDate: new Date('2026-02-08T11:30:00'),
      location: 'Main Sanctuary',
      maxCapacity: 200,
      requiresRsvp: false,
      status: 'published',
      featured: true,
      organizerName: 'Pastor Sarah',
      organizerEmail: 'pastor@church.org',
      tags: '[]',
    },
  });

  await prisma.event.create({
    data: {
      title: 'Community Food Drive',
      slug: 'community-food-drive',
      description: 'Help serve our community by donating food items.',
      category: 'outreach',
      date: new Date('2026-02-15T09:00:00'),
      endDate: new Date('2026-02-15T14:00:00'),
      location: 'Church Parking Lot',
      maxCapacity: 50,
      requiresRsvp: true,
      status: 'published',
      organizerName: 'Outreach Team',
      organizerEmail: 'outreach@church.org',
      tags: '[]',
    },
  });

  console.log('✅ Created 2 events');

  // Create prayer requests
  console.log('\nCreating prayer requests...');
  await prisma.prayerRequest.create({
    data: {
      name: 'Sarah Miller',
      userEmail: 'sarah@example.com',
      request: 'Please pray for my father recovering from surgery. Grateful for skilled doctors.',
      category: 'healing',
      isAnonymous: false,
      approved: true,
    },
  });

  await prisma.prayerRequest.create({
    data: {
      name: 'David Johnson',
      userEmail: 'david@example.com',
      request: 'Seeking guidance for an important career decision. Pray for wisdom and clarity.',
      category: 'guidance',
      isAnonymous: false,
      approved: false,
    },
  });

  console.log('✅ Created 2 prayer requests (1 pending approval)');
  console.log('\n🎉 Test data ready!\n');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
