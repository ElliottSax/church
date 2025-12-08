#!/bin/bash

# Minneapolis Community of Christ Website - Setup Script
# This script helps you get started quickly

set -e

echo "🚀 Minneapolis Community of Christ Website Setup"
echo "=================================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
    echo ""
else
    echo -e "${GREEN}✓ Dependencies already installed${NC}"
    echo ""
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚙️  Creating .env.local from template...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local${NC}"
    echo -e "${BLUE}ℹ️  Edit .env.local to add your service credentials${NC}"
    echo ""
else
    echo -e "${GREEN}✓ .env.local already exists${NC}"
    echo ""
fi

echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. ${BLUE}Start development server:${NC}"
echo "   npm run dev"
echo ""
echo "2. ${BLUE}Open your browser:${NC}"
echo "   http://localhost:3000"
echo ""
echo "3. ${BLUE}Configure services (optional):${NC}"
echo "   - Edit .env.local with your credentials"
echo "   - See docs/INTEGRATIONS_GUIDE.md for details"
echo ""
echo "4. ${BLUE}Quick access:${NC}"
echo "   - Base site: http://localhost:3000"
echo "   - Sanity CMS: http://localhost:3000/studio"
echo "   - Sign In: http://localhost:3000/auth/signin"
echo "   - Member Portal: http://localhost:3000/members"
echo "   - Donations: http://localhost:3000/give/online"
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICK_START.md"
echo "   - Full Setup: docs/INTEGRATIONS_GUIDE.md"
echo "   - Features: docs/NEW_FEATURES.md"
echo ""
echo "🎉 Ready to launch!"
