#!/bin/bash

# Pre-deploy check script for Next.js static export

set -e  # Exit on any error

echo "🔍 Running pre-deploy checks..."

# 1. Type checking
echo "📝 1/4 Type checking..."
npm run type-check || { echo "❌ Type check failed"; exit 1; }

# 2. Linting
echo "🧹 2/4 Linting..."
npm run lint || { echo "❌ Lint failed"; exit 1; }

# 3. Build test
echo "🏗️  3/4 Testing build..."
npm run build || { echo "❌ Build failed"; exit 1; }

# 4. Check for console.log in production code
echo "🔎 4/4 Checking for console.log statements..."
if grep -r "console.log" --include="*.tsx" --include="*.ts" app/ 2>/dev/null | grep -v ".test." | head -5; then
  echo "⚠️  Warning: Found console.log statements (not blocking)"
else
  echo "✅ No console.log found"
fi

echo ""
echo "✅ All pre-deploy checks passed!"
echo "🚀 Ready for deployment"
