/**
 * Database Seeding Script
 *
 * Run with: npx tsx lib/db/seed.ts
 *
 * This script populates the database with sample data
 */

import { prisma } from './client';
import { logger, logError, logWarn } from '@/lib/logger';

async function main() {
  logger.info('🌱 Starting database seeding...');

  // Clear existing data (optional - comment out in production)
  logger.info('🗑️  Clearing existing data...');
  await prisma.prayerInteraction.deleteMany();
  await prisma.rSVP.deleteMany();
  await prisma.event.deleteMany();
  await prisma.prayerRequest.deleteMany();
  await prisma.donation.deleteMany();
  await prisma.volunteerSignup.deleteMany();
  await prisma.volunteerOpportunity.deleteMany();
  await prisma.sermon.deleteMany();
  await prisma.news.deleteMany();
  await prisma.setting.deleteMany();

  // Seed Events
  logger.info('📅 Seeding events...');
  const events = await Promise.all([
    prisma.event.create({
      data: {
        title: 'Sunday Worship Service',
        slug: 'sunday-worship-service',
        description: 'Join us for our weekly worship service with inspiring messages, uplifting music, and fellowship.',
        date: new Date('2024-02-04T10:00:00'),
        endDate: new Date('2024-02-04T11:30:00'),
        location: 'Main Sanctuary',
        category: 'worship',
        maxCapacity: 300,
        requiresRsvp: false,
        featured: true,
        status: 'upcoming',
        isRecurring: true,
        recurringFrequency: 'weekly',
        organizerName: 'Pastor John Smith',
        organizerEmail: 'pastor@church.org',
        organizerPhone: '(555) 123-4567',
        tags: JSON.stringify(['worship', 'sunday', 'service'])
      }
    }),
    prisma.event.create({
      data: {
        title: 'Youth Group Movie Night',
        slug: 'youth-group-movie-night',
        description: 'A fun evening for teens with movies, popcorn, and fellowship. Ages 13-18 welcome!',
        date: new Date('2024-02-09T18:00:00'),
        endDate: new Date('2024-02-09T21:00:00'),
        location: 'Youth Center',
        category: 'youth',
        maxCapacity: 50,
        requiresRsvp: true,
        rsvpDeadline: new Date('2024-02-08T17:00:00'),
        featured: false,
        status: 'upcoming',
        organizerName: 'Sarah Johnson',
        organizerEmail: 'youth@church.org',
        tags: JSON.stringify(['youth', 'social', 'teens'])
      }
    }),
    prisma.event.create({
      data: {
        title: 'Community Food Drive',
        slug: 'community-food-drive',
        description: 'Help us serve our community by donating non-perishable food items for local families in need.',
        date: new Date('2024-02-10T09:00:00'),
        endDate: new Date('2024-02-10T15:00:00'),
        location: 'Church Parking Lot',
        category: 'community',
        requiresRsvp: false,
        featured: true,
        status: 'upcoming',
        organizerName: 'Mission Team',
        organizerEmail: 'mission@church.org',
        tags: JSON.stringify(['community', 'service', 'outreach'])
      }
    })
  ]);

  logger.info(`✅ Created ${events.length} events`);

  // Seed Prayer Requests
  logger.info('🙏 Seeding prayer requests...');
  const prayerRequests = await Promise.all([
    prisma.prayerRequest.create({
      data: {
        name: 'Sarah M.',
        request: 'Please pray for my mother who is going through cancer treatment. We believe in God\'s healing power.',
        category: 'healing',
        isAnonymous: false,
        isPublic: true,
        approved: true,
        prayerCount: 42
      }
    }),
    prisma.prayerRequest.create({
      data: {
        name: 'Anonymous',
        request: 'Seeking God\'s guidance for an important career decision. I want to follow His will for my life.',
        category: 'guidance',
        isAnonymous: true,
        isPublic: true,
        approved: true,
        prayerCount: 28
      }
    }),
    prisma.prayerRequest.create({
      data: {
        name: 'John D.',
        request: 'Thank you Lord for answering our prayers! My son got accepted into college with a full scholarship.',
        category: 'thanksgiving',
        isAnonymous: false,
        isPublic: true,
        approved: true,
        prayerCount: 65
      }
    })
  ]);

  logger.info(`✅ Created ${prayerRequests.length} prayer requests`);

  // Seed Volunteer Opportunities
  logger.info('🤝 Seeding volunteer opportunities...');
  const volunteers = await Promise.all([
    prisma.volunteerOpportunity.create({
      data: {
        title: 'Sunday School Teacher',
        slug: 'sunday-school-teacher',
        category: 'education',
        description: 'Lead a Sunday school class for children ages 6-10. Help young minds grow in faith!',
        commitment: 'Weekly on Sundays, 9:00 AM - 10:00 AM',
        requirements: 'Background check required. Experience with children preferred.',
        contactPerson: 'Emily Davis',
        contactEmail: 'education@church.org',
        active: true,
        featured: true
      }
    }),
    prisma.volunteerOpportunity.create({
      data: {
        title: 'Worship Team Member',
        slug: 'worship-team-member',
        category: 'music',
        description: 'Join our worship team! We need vocalists and instrumentalists.',
        commitment: 'Weekly rehearsal on Thursdays, service on Sundays',
        contactPerson: 'David Lee',
        contactEmail: 'worship@church.org',
        active: true,
        featured: true
      }
    })
  ]);

  logger.info(`✅ Created ${volunteers.length} volunteer opportunities`);

  // Seed Sermons
  logger.info('🎤 Seeding sermons...');
  const sermons = await Promise.all([
    prisma.sermon.create({
      data: {
        title: 'Walking in Faith',
        slug: 'walking-in-faith',
        speaker: 'Pastor John Smith',
        date: new Date('2024-01-28T10:00:00'),
        scripture: 'Hebrews 11:1-6',
        series: 'Faith Foundations',
        description: 'Exploring what it means to walk by faith and not by sight.',
        audioUrl: 'https://example.com/sermons/walking-in-faith.mp3',
        videoUrl: 'https://youtube.com/watch?v=example',
        tags: JSON.stringify(['faith', 'hebrews', 'sunday']),
        featured: true
      }
    })
  ]);

  logger.info(`✅ Created ${sermons.length} sermons`);

  // Seed Settings
  logger.info('⚙️  Seeding settings...');
  const settings = await Promise.all([
    prisma.setting.create({
      data: {
        key: 'site.name',
        value: 'Minneapolis Community of Christ',
        category: 'site',
        type: 'string'
      }
    }),
    prisma.setting.create({
      data: {
        key: 'features.enablePrayerWall',
        value: 'true',
        category: 'features',
        type: 'boolean'
      }
    }),
    prisma.setting.create({
      data: {
        key: 'prayerWall.requireApproval',
        value: 'true',
        category: 'prayerWall',
        type: 'boolean'
      }
    })
  ]);

  logger.info(`✅ Created ${settings.length} settings`);

  logger.info('✨ Database seeding completed!');
}

main()
  .catch((e) => {
    logError('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
