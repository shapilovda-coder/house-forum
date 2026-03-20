#!/bin/bash

# Pre-deploy check script for Next.js static export

set -e  # Exit on any error

echo "🔍 Running pre-deploy checks..."

# 1. Type checking
echo "📝 1/2 Type checking..."
npm run type-check || { echo "❌ Type check failed"; exit 1; }

# 2. Build test
echo "🏗️  2/2 Testing build..."
npm run build || { echo "❌ Build failed"; exit 1; }

echo ""
echo "✅ All pre-deploy checks passed!"
echo "🚀 Ready for deployment"
