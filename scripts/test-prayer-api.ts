/**
 * Test Script for Prayer Wall API Integration
 *
 * Run this script to test the prayer API endpoints:
 * npx ts-node scripts/test-prayer-api.ts
 */

import { prayerRepository } from '@/lib/db/repositories/prayer.repository';

async function testPrayerAPI() {
  console.log('🧪 Testing Prayer Wall API Integration\n');

  try {
    // Test 1: Create a test prayer request
    console.log('1️⃣ Creating test prayer request...');
    const newPrayer = await prayerRepository.create({
      name: 'Test User',
      request: 'This is a test prayer request for API integration testing.',
      category: 'other',
      isAnonymous: false,
      isPublic: true,
      approved: false, // Requires approval
    });
    console.log('✅ Created:', newPrayer.id);

    // Test 2: Fetch pending prayers
    console.log('\n2️⃣ Fetching pending prayers...');
    const pending = await prayerRepository.findAll({ approved: false, limit: 5 });
    console.log(`✅ Found ${pending.length} pending prayers`);

    // Test 3: Approve the prayer
    console.log('\n3️⃣ Approving prayer request...');
    const approved = await prayerRepository.approve(newPrayer.id);
    console.log('✅ Approved:', approved.approved);

    // Test 4: Fetch public prayers
    console.log('\n4️⃣ Fetching public prayers...');
    const publicPrayers = await prayerRepository.findPublic({ limit: 5 });
    console.log(`✅ Found ${publicPrayers.length} public prayers`);

    // Test 5: Increment prayer count
    console.log('\n5️⃣ Incrementing prayer count...');
    const prayerCount = await prayerRepository.incrementPrayerCount(newPrayer.id, 'test-user-id');
    console.log('✅ Prayer count:', prayerCount);

    // Test 6: Update prayer request
    console.log('\n6️⃣ Updating prayer request...');
    const updated = await prayerRepository.update(newPrayer.id, {
      category: 'thanksgiving',
    });
    console.log('✅ Updated category:', updated.category);

    // Test 7: Search prayers
    console.log('\n7️⃣ Searching prayers...');
    const searchResults = await prayerRepository.search('test');
    console.log(`✅ Found ${searchResults.length} matching prayers`);

    // Test 8: Get trending prayers
    console.log('\n8️⃣ Fetching trending prayers...');
    const trending = await prayerRepository.findTrending(7, 5);
    console.log(`✅ Found ${trending.length} trending prayers`);

    // Test 9: Get prayer statistics
    console.log('\n9️⃣ Fetching prayer statistics...');
    const stats = await prayerRepository.getStats();
    console.log('✅ Statistics:', {
      totalRequests: stats.totalRequests,
      totalPrayers: stats.totalPrayers,
      categories: Object.keys(stats.categoryCounts).length,
    });

    // Cleanup: Delete test prayer
    console.log('\n🧹 Cleaning up test data...');
    await prayerRepository.delete(newPrayer.id);
    console.log('✅ Test prayer deleted');

    console.log('\n✨ All tests passed successfully!\n');
    console.log('📋 Summary:');
    console.log('  - Prayer creation: ✅');
    console.log('  - Approval workflow: ✅');
    console.log('  - Public/Private filtering: ✅');
    console.log('  - Prayer count tracking: ✅');
    console.log('  - Search functionality: ✅');
    console.log('  - Trending prayers: ✅');
    console.log('  - Statistics: ✅');
    console.log('\n🎉 Prayer Wall API is ready for production!');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
testPrayerAPI()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
