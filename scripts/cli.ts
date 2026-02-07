#!/usr/bin/env tsx
/**
 * Church Website CLI Tool
 *
 * Usage: npx tsx scripts/cli.ts [command] [options]
 *
 * Commands:
 *   seed              - Seed database with sample data
 *   migrate           - Migrate from old mock data
 *   backup            - Backup database to JSON
 *   restore [file]    - Restore from JSON backup
 *   stats             - Show database statistics
 *   cache:clear       - Clear all caches
 *   email:test [to]   - Send test email
 */

import { Command } from 'commander';

const program = new Command();

program
  .name('church-cli')
  .description('Church Website Management CLI')
  .version('1.0.0');

// Seed command
program
  .command('seed')
  .description('Seed database with sample data')
  .action(async () => {
    console.log('🌱 Seeding database...\n');
    const { default: seed } = await import('../lib/db/seed');
    process.exit(0);
  });

// Migrate command
program
  .command('migrate')
  .description('Migrate from old mock data to database')
  .action(async () => {
    const { runAllMigrations } = await import('../lib/utils/migration');
    await runAllMigrations();
    process.exit(0);
  });

// Backup command
program
  .command('backup')
  .description('Backup database to JSON file')
  .option('-o, --output <path>', 'Output file path', './backup.json')
  .action(async (options) => {
    const { backupDatabaseToJSON } = await import('../lib/utils/migration');
    await backupDatabaseToJSON(options.output);
    process.exit(0);
  });

// Restore command
program
  .command('restore <file>')
  .description('Restore database from JSON backup')
  .action(async (file) => {
    const { restoreFromJSON } = await import('../lib/utils/migration');
    await restoreFromJSON(file);
    process.exit(0);
  });

// Stats command
program
  .command('stats')
  .description('Show database statistics')
  .option('-d, --days <number>', 'Number of days to analyze', '30')
  .action(async (options) => {
    const { getAnalyticsSummary } = await import('../lib/analytics/tracker');
    const stats = await getAnalyticsSummary(parseInt(options.days));

    console.log('\n📊 Database Statistics\n');
    console.log('Events:');
    console.log(`  Total: ${stats.events.total}`);
    console.log(`  Average per week: ${stats.events.averagePerWeek.toFixed(1)}`);
    console.log('');
    console.log('RSVPs:');
    console.log(`  Total: ${stats.rsvps.total}`);
    console.log(`  Average per event: ${stats.rsvps.averagePerEvent.toFixed(1)}`);
    console.log('');
    console.log('Prayer Requests:');
    console.log(`  Total: ${stats.prayerRequests.total}`);
    console.log(`  Average per week: ${stats.prayerRequests.averagePerWeek.toFixed(1)}`);
    console.log('');
    console.log('Donations:');
    console.log(`  Count: ${stats.donations.count}`);
    console.log(`  Total: $${stats.donations.total.toFixed(2)}`);
    console.log(`  Average: $${stats.donations.average.toFixed(2)}`);
    console.log('');
    console.log('Users:');
    console.log(`  New: ${stats.users.new}`);
    console.log(`  Monthly growth rate: ${stats.users.growthRate.toFixed(1)}`);
    console.log('');

    process.exit(0);
  });

// Clear cache command
program
  .command('cache:clear')
  .description('Clear all caches')
  .action(async () => {
    const { cache } = await import('../lib/cache/redis');
    await cache.clear();
    console.log('✅ Cache cleared');
    process.exit(0);
  });

// Test email command
program
  .command('email:test <to>')
  .description('Send test email')
  .action(async (to) => {
    const { sendEmail } = await import('../lib/email');

    console.log(`📧 Sending test email to ${to}...`);

    await sendEmail({
      to,
      subject: 'Test Email from Church Website',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email from your church website.</p>
        <p>If you received this, your email configuration is working correctly!</p>
      `
    });

    console.log('✅ Email sent');
    process.exit(0);
  });

// Create admin user
program
  .command('admin:create <email> <name>')
  .description('Create admin user')
  .action(async (email, name) => {
    const { prisma } = await import('../lib/db/client');

    const user = await prisma.user.create({
      data: {
        email,
        name,
        role: 'admin',
        emailVerified: new Date(),
      }
    });

    console.log('✅ Admin user created:');
    console.log(`   Email: ${user.email}`);
    console.log(`   Name: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    process.exit(0);
  });

// Send prayer digest
program
  .command('prayer:digest')
  .description('Send weekly prayer digest')
  .option('-e, --emails <emails>', 'Comma-separated email addresses')
  .action(async (options) => {
    const { prayerService } = await import('../lib/services/prayer.service');

    const emails = options.emails ? options.emails.split(',') : [];

    if (emails.length === 0) {
      console.error('❌ Please provide email addresses with -e flag');
      process.exit(1);
    }

    console.log(`📧 Sending prayer digest to ${emails.length} recipients...`);
    await prayerService.sendWeeklyDigest(emails);
    console.log('✅ Prayer digest sent');
    process.exit(0);
  });

// Send event reminders
program
  .command('events:remind')
  .description('Send event reminders')
  .action(async () => {
    const { eventService } = await import('../lib/services/event.service');

    console.log('📧 Sending event reminders...');
    await eventService.sendEventReminders();
    console.log('✅ Reminders sent');
    process.exit(0);
  });

program.parse();
