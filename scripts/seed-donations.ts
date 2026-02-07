/**
 * Seed Donations Script
 *
 * Use this script to create test donation data for development and testing
 *
 * Usage:
 * npx tsx scripts/seed-donations.ts
 */

import { prisma } from '../lib/db/client';

const FUNDS = ['general', 'missions', 'building', 'youth', 'benevolence'];
const FREQUENCIES = ['one-time', 'weekly', 'monthly', 'yearly'];

interface DonationSeed {
  userId?: string;
  amount: number;
  fund: string;
  frequency: string;
  donorName?: string;
  donorEmail?: string;
  status: string;
  createdAt: Date;
  notes?: string;
}

/**
 * Generate random donation data
 */
function generateRandomDonation(userId: string, email: string, name: string, daysAgo: number): DonationSeed {
  const fund = FUNDS[Math.floor(Math.random() * FUNDS.length)];
  const frequency = FREQUENCIES[Math.floor(Math.random() * FREQUENCIES.length)];

  // Generate random amount based on frequency
  let amount: number;
  if (frequency === 'one-time') {
    amount = Math.floor(Math.random() * 500) + 50; // $50-$550
  } else if (frequency === 'yearly') {
    amount = Math.floor(Math.random() * 1000) + 500; // $500-$1500
  } else if (frequency === 'monthly') {
    amount = Math.floor(Math.random() * 200) + 25; // $25-$225
  } else {
    amount = Math.floor(Math.random() * 50) + 10; // $10-$60
  }

  const createdAt = new Date();
  createdAt.setDate(createdAt.getDate() - daysAgo);

  const notes = Math.random() > 0.7 ? 'Thank you for all you do!' : undefined;

  return {
    userId,
    amount,
    fund,
    frequency,
    donorName: name,
    donorEmail: email,
    status: 'completed',
    createdAt,
    notes,
  };
}

/**
 * Generate donations across different months
 */
function generateDonationsForUser(userId: string, email: string, name: string, count: number): DonationSeed[] {
  const donations: DonationSeed[] = [];

  for (let i = 0; i < count; i++) {
    // Spread donations across the last 365 days
    const daysAgo = Math.floor(Math.random() * 365);
    donations.push(generateRandomDonation(userId, email, name, daysAgo));
  }

  return donations;
}

/**
 * Main seed function
 */
async function seedDonations() {
  try {
    console.log('🌱 Seeding donation data...\n');

    // Get or create a test user
    let testUser = await prisma.user.findFirst({
      where: { email: 'test@example.com' }
    });

    if (!testUser) {
      console.log('Creating test user...');
      testUser = await prisma.user.create({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          role: 'member',
        }
      });
      console.log(`✅ Created test user: ${testUser.email}\n`);
    } else {
      console.log(`✅ Found existing test user: ${testUser.email}\n`);
    }

    // Generate 25 donations for the test user
    const donationCount = 25;
    console.log(`Generating ${donationCount} donations...`);

    const donations = generateDonationsForUser(
      testUser.id,
      testUser.email,
      testUser.name || 'Test User',
      donationCount
    );

    // Create donations in database
    let created = 0;
    for (const donation of donations) {
      await prisma.donation.create({
        data: donation
      });
      created++;

      // Show progress
      if (created % 5 === 0) {
        console.log(`  Created ${created}/${donationCount} donations...`);
      }
    }

    console.log(`\n✅ Successfully created ${created} donations!\n`);

    // Show summary statistics
    const stats = {
      total: donations.reduce((sum, d) => sum + d.amount, 0),
      byFund: {} as Record<string, number>,
      byFrequency: {} as Record<string, number>,
    };

    donations.forEach(d => {
      stats.byFund[d.fund] = (stats.byFund[d.fund] || 0) + d.amount;
      stats.byFrequency[d.frequency] = (stats.byFrequency[d.frequency] || 0) + 1;
    });

    console.log('📊 Summary Statistics:');
    console.log(`   Total Amount: $${stats.total.toFixed(2)}`);
    console.log(`   Average: $${(stats.total / created).toFixed(2)}`);
    console.log('\n   By Fund:');
    Object.entries(stats.byFund)
      .sort((a, b) => b[1] - a[1])
      .forEach(([fund, amount]) => {
        console.log(`     ${fund.padEnd(12)}: $${amount.toFixed(2)}`);
      });
    console.log('\n   By Frequency:');
    Object.entries(stats.byFrequency).forEach(([freq, count]) => {
      console.log(`     ${freq.padEnd(12)}: ${count} donations`);
    });

    console.log('\n✨ Done! You can now test the donation history page at:');
    console.log('   http://localhost:3000/members/donations\n');
    console.log('   Login with: test@example.com\n');

  } catch (error) {
    console.error('❌ Error seeding donations:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDonations()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
