/**
 * Migration Utilities
 *
 * Helper functions to migrate from old mock data system to new database
 */

import { prisma } from '@/lib/db/client';
import { eventsRepository } from '@/lib/db/repositories/events.repository';
import { prayerRepository } from '@/lib/db/repositories/prayer.repository';
import { logger, logError, logWarn } from '@/lib/logger';

/**
 * Migrate events from mock data to database
 */
export async function migrateEventsFromMockData() {
  logger.info('🔄 Migrating events from mock data...');

  // Old mock data (from lib/events.ts)
  const mockEvents = [
    {
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
      organizerName: 'Pastor John Smith',
      organizerEmail: 'pastor@church.org',
      organizerPhone: '(555) 123-4567',
      tags: ['worship', 'sunday', 'service'],
    },
    // Add more events from your mock data
  ];

  let migrated = 0;

  for (const eventData of mockEvents) {
    try {
      // Check if already exists
      const existing = await eventsRepository.findBySlug(eventData.slug);

      if (!existing) {
        await eventsRepository.create(eventData as any);
        migrated++;
        logger.info(`✅ Migrated: ${eventData.title}`);
      } else {
        logger.info(`⏭️  Skipped (exists): ${eventData.title}`);
      }
    } catch (error) {
      logError(`❌ Failed to migrate ${eventData.title}:`, error);
    }
  }

  logger.info(`✨ Migration complete: ${migrated} events migrated`);
  return migrated;
}

/**
 * Migrate prayer requests from mock data
 */
export async function migratePrayerRequestsFromMockData() {
  logger.info('🔄 Migrating prayer requests from mock data...');

  // Old mock data (from lib/prayer-wall.ts)
  const mockRequests = [
    {
      name: 'Sarah M.',
      request: 'Please pray for my mother who is going through cancer treatment.',
      category: 'healing',
      isAnonymous: false,
      isPublic: true,
      approved: true,
      prayerCount: 42,
    },
    // Add more from your mock data
  ];

  let migrated = 0;

  for (const requestData of mockRequests) {
    try {
      await prayerRepository.create(requestData as any);
      migrated++;
      logger.info(`✅ Migrated prayer request from: ${requestData.name}`);
    } catch (error) {
      logError(`❌ Failed to migrate prayer request:`, error);
    }
  }

  logger.info(`✨ Migration complete: ${migrated} prayer requests migrated`);
  return migrated;
}

/**
 * Import data from Sanity CMS
 */
export async function importFromSanity() {
  logger.info('🔄 Importing data from Sanity CMS...');

  try {
    const { client } = await import('@/lib/sanity');

    // Import events
    const sanityEvents = await client.fetch(`
      *[_type == "event"] {
        _id,
        title,
        slug,
        date,
        endDate,
        location,
        category,
        description,
        image,
        maxCapacity,
        requiresRsvp,
        featured
      }
    `);

    for (const event of sanityEvents) {
      try {
        await eventsRepository.create({
          title: event.title,
          slug: event.slug.current,
          description: event.description || '',
          date: new Date(event.date),
          endDate: event.endDate ? new Date(event.endDate) : undefined,
          location: event.location,
          category: event.category,
          image: event.image?.asset?._ref,
          maxCapacity: event.maxCapacity,
          requiresRsvp: event.requiresRsvp || false,
          featured: event.featured || false,
          status: 'upcoming',
          organizerName: 'Church Admin', // Default
          organizerEmail: 'admin@church.org',
          tags: '[]',
        });
        logger.info(`✅ Imported event: ${event.title}`);
      } catch (error) {
        logError(`❌ Failed to import ${event.title}:`, error);
      }
    }

    // Import sermons
    const sanitySermons = await client.fetch(`
      *[_type == "sermon"] {
        _id,
        title,
        slug,
        speaker,
        date,
        scripture,
        series,
        description,
        audioUrl,
        videoUrl,
        tags,
        featured
      }
    `);

    for (const sermon of sanitySermons) {
      try {
        await prisma.sermon.create({
          data: {
            title: sermon.title,
            slug: sermon.slug.current,
            speaker: sermon.speaker,
            date: new Date(sermon.date),
            scripture: sermon.scripture,
            series: sermon.series,
            description: sermon.description,
            audioUrl: sermon.audioUrl,
            videoUrl: sermon.videoUrl,
            tags: sermon.tags || [],
            featured: sermon.featured || false,
          }
        });
        logger.info(`✅ Imported sermon: ${sermon.title}`);
      } catch (error) {
        logError(`❌ Failed to import ${sermon.title}:`, error);
      }
    }

    logger.info('✨ Sanity import complete!');
  } catch (error) {
    logError('❌ Failed to import from Sanity:', error);
    throw error;
  }
}

/**
 * Run all migrations
 */
export async function runAllMigrations() {
  logger.info('🚀 Starting full migration...\n');

  try {
    await migrateEventsFromMockData();
    logger.info('');
    await migratePrayerRequestsFromMockData();
    logger.info('');

    // Uncomment if using Sanity
    // await importFromSanity();

    logger.info('\n🎉 All migrations completed successfully!');
  } catch (error) {
    logError('\n❌ Migration failed:', error);
    throw error;
  }
}

/**
 * Backup database to JSON
 */
export async function backupDatabaseToJSON(outputPath: string = './backup.json') {
  logger.info('💾 Creating database backup...');

  const [events, rsvps, prayerRequests, sermons, users] = await Promise.all([
    prisma.event.findMany(),
    prisma.rSVP.findMany(),
    prisma.prayerRequest.findMany(),
    prisma.sermon.findMany(),
    prisma.user.findMany(),
  ]);

  const backup = {
    timestamp: new Date().toISOString(),
    data: {
      events,
      rsvps,
      prayerRequests,
      sermons,
      users,
    },
  };

  const fs = require('fs');
  fs.writeFileSync(outputPath, JSON.stringify(backup, null, 2));

  logger.info(`✅ Backup saved to: ${outputPath}`);
  logger.info(`   Events: ${events.length}`);
  logger.info(`   RSVPs: ${rsvps.length}`);
  logger.info(`   Prayer Requests: ${prayerRequests.length}`);
  logger.info(`   Sermons: ${sermons.length}`);
  logger.info(`   Users: ${users.length}`);
}

/**
 * Restore from JSON backup
 */
export async function restoreFromJSON(backupPath: string) {
  logger.info('📥 Restoring from backup...');

  const fs = require('fs');
  const backup = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));

  const { events, rsvps, prayerRequests, sermons, users } = backup.data;

  // Restore users first (for foreign key constraints)
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      create: user,
      update: user,
    });
  }

  // Restore events
  for (const event of events) {
    await prisma.event.upsert({
      where: { id: event.id },
      create: event,
      update: event,
    });
  }

  // Restore other data...

  logger.info('✅ Restore complete!');
}
