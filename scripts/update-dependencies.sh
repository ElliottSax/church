#!/bin/bash
# Script to update package.json with new dependencies

echo "📦 Updating package.json with new dependencies..."

# Add new dependencies
npm install @prisma/client

# Add new dev dependencies
npm install -D prisma tsx

echo "✅ Dependencies updated!"
echo ""
echo "Next steps:"
echo "1. Set up your database connection in .env.local"
echo "2. Run: npx prisma generate"
echo "3. Run: npx prisma db push"
echo "4. Run: npx tsx lib/db/seed.ts"
echo ""
echo "See BACKEND_SETUP_GUIDE.md for detailed instructions."
