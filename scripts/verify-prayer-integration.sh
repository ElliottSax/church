#!/bin/bash

# Prayer Wall Integration Verification Script
# Run this script to verify all components are properly connected

echo "🔍 Verifying Prayer Wall Integration..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0

# Check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $2"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $2 - File not found: $1"
        ((FAILED++))
    fi
}

# Check if content exists in file
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $3"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} $3"
        ((FAILED++))
    fi
}

echo "📁 Checking Files..."
echo "-------------------"

# Check API files
check_file "app/api/v2/prayer-requests/route.ts" "Prayer Requests API (main)"
check_file "app/api/v2/prayer-requests/[id]/route.ts" "Prayer Requests API (by ID)"

# Check component files
check_file "components/home/PrayerWall.tsx" "Prayer Wall Component"
check_file "components/admin/PendingPrayersCard.tsx" "Pending Prayers Admin Component"

# Check updated files
check_file "app/admin/dashboard/page.tsx" "Admin Dashboard"

# Check repository
check_file "lib/db/repositories/prayer.repository.ts" "Prayer Repository"

# Check validation schemas
check_file "lib/validations/prayer.schema.ts" "Prayer Validation Schemas"

# Check test files
check_file "scripts/test-prayer-api.ts" "API Test Script"

# Check documentation
check_file "PRAYER_WALL_TESTING_GUIDE.md" "Testing Guide"
check_file "PRAYER_WALL_IMPLEMENTATION_SUMMARY.md" "Implementation Summary"

echo ""
echo "🔗 Checking Integrations..."
echo "----------------------------"

# Check Prayer Wall API integration
check_content "components/home/PrayerWall.tsx" "fetch.*prayer-requests" "Prayer Wall fetches from API"
check_content "components/home/PrayerWall.tsx" "handleSubmit" "Prayer Wall has submit handler"
check_content "components/home/PrayerWall.tsx" "useState.*loading" "Prayer Wall has loading state"
check_content "components/home/PrayerWall.tsx" "useState.*error" "Prayer Wall has error state"

# Check Admin Dashboard integration
check_content "app/admin/dashboard/page.tsx" "PendingPrayersCard" "Admin Dashboard uses PendingPrayersCard"
check_content "components/admin/PendingPrayersCard.tsx" "handleApprove" "Pending Prayers has approve handler"
check_content "components/admin/PendingPrayersCard.tsx" "handleDecline" "Pending Prayers has decline handler"
check_content "components/admin/PendingPrayersCard.tsx" "fetch.*PATCH" "Pending Prayers calls PATCH API"

# Check API endpoints
check_content "app/api/v2/prayer-requests/[id]/route.ts" "export const GET" "API has GET endpoint"
check_content "app/api/v2/prayer-requests/[id]/route.ts" "export const PATCH" "API has PATCH endpoint"
check_content "app/api/v2/prayer-requests/[id]/route.ts" "export const DELETE" "API has DELETE endpoint"
check_content "app/api/v2/prayer-requests/[id]/route.ts" "prayerRepository.update" "API uses repository update"

# Check repository methods
check_content "lib/db/repositories/prayer.repository.ts" "async approve" "Repository has approve method"
check_content "lib/db/repositories/prayer.repository.ts" "async update" "Repository has update method"
check_content "lib/db/repositories/prayer.repository.ts" "async findPublic" "Repository has findPublic method"

echo ""
echo "📊 Results"
echo "----------"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}✨ All checks passed! Prayer Wall integration is complete.${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Run the test script: npx ts-node scripts/test-prayer-api.ts"
    echo "2. Start the dev server: npm run dev"
    echo "3. Test the Prayer Wall on the homepage"
    echo "4. Test approval in admin dashboard at /admin/dashboard"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some checks failed. Please review the errors above.${NC}"
    echo ""
    exit 1
fi
