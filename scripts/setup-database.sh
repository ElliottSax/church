#!/bin/bash

# Database Setup Script for Church Website
# This script sets up Prisma and initializes the database

set -e

echo "========================================="
echo "Church Website - Database Setup"
echo "========================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Step 1: Install Prisma
echo "Step 1: Installing Prisma..."
npm install prisma @prisma/client
npm install -D prisma
echo "✓ Prisma installed"
echo ""

# Step 2: Check for .env.local
if [ ! -f ".env.local" ]; then
    echo "Step 2: Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "✓ Created .env.local"
else
    echo "Step 2: .env.local already exists"
fi
echo ""

# Step 3: Add DATABASE_URL to .env.local if not present
if ! grep -q "DATABASE_URL" .env.local; then
    echo "Step 3: Adding DATABASE_URL to .env.local..."
    echo "" >> .env.local
    echo "# Database" >> .env.local
    echo "DATABASE_URL=\"file:./dev.db\"" >> .env.local
    echo "✓ Added DATABASE_URL to .env.local"
else
    echo "Step 3: DATABASE_URL already configured"
fi
echo ""

# Step 4: Generate Prisma Client
echo "Step 4: Generating Prisma Client..."
npx prisma generate --schema=./lib/db/schema.prisma
echo "✓ Prisma Client generated"
echo ""

# Step 5: Create Database
echo "Step 5: Creating database..."
npx prisma db push --schema=./lib/db/schema.prisma
echo "✓ Database created"
echo ""

# Step 6: Create seed script directory
echo "Step 6: Setting up seed script..."
mkdir -p scripts
cat > scripts/seed-users.js << 'EOF'
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@minneapoliscofchrist.org' },
    update: {},
    create: {
      email: 'admin@minneapoliscofchrist.org',
      name: 'Admin User',
      role: 'admin',
    },
  });
  console.log('✓ Created admin user:', admin.email);

  // Create test member
  const member = await prisma.user.upsert({
    where: { email: 'member@test.com' },
    update: {},
    create: {
      email: 'member@test.com',
      name: 'Test Member',
      role: 'member',
    },
  });
  console.log('✓ Created test member:', member.email);

  console.log('\nSeeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
EOF
echo "✓ Seed script created"
echo ""

# Step 7: Run seed script
echo "Step 7: Seeding initial users..."
node scripts/seed-users.js
echo "✓ Database seeded"
echo ""

echo "========================================="
echo "Database setup complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Start your development server: npm run dev"
echo "2. Visit: http://localhost:3000/admin/users"
echo "3. You can log in with:"
echo "   - admin@minneapoliscofchrist.org (admin role)"
echo "   - member@test.com (member role)"
echo ""
echo "For more information, see DATABASE_SETUP.md"
echo ""
