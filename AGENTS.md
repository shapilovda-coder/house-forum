# СтройСейлс (StroySales) — AI Agent Guide

## Project Overview

**СтройСейлс** is a Russian-language supplier catalog website for construction-related products: transparent shutters, protective shutters, gates, frameless glazing, office partitions, and soft windows. The site connects customers with verified suppliers across Russia, with primary focus on Moscow and St. Petersburg regions.

- **Domain**: https://stroysales.ru
- **Type**: Static site generated with Next.js
- **Language**: Russian (ru-RU)
- **Target Regions**: Moscow, St. Petersburg, and other Russian regions

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Framework | Next.js | 15.1.0 |
| React | React | 19.0.0 |
| Language | TypeScript | 5.7.0 |
| Styling | Tailwind CSS | 3.4.17 |
| Testing | Playwright | 1.58.2 |
| Bundler | Next.js built-in | — |
| Error Monitoring | Sentry | 10.45.0 |
| Analytics | Yandex Metrica | — |

## Project Structure

```
/Users/a1/Documents/GitHub/house-forum/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Homepage with supplier list
│   ├── layout.tsx                # Root layout with header/footer/Schema.org
│   ├── [category]/               # Category pages (e.g., /prozrachnye-rolstavni/)
│   ├── [category]/[region]/      # Category + region pages
│   ├── blog/                     # Blog listing page
│   ├── calculator/               # Price calculator
│   ├── kontakty/                 # Contact page
│   ├── prozrachnye-rolstavni/kalkulyator/  # StekloRoll calculator
│   └── components/               # React components
│       ├── CompanyCard.tsx       # Supplier card component
│       ├── CategoryPage.tsx      # Category page layout
│       ├── SearchBar.tsx         # Search functionality
│       └── SchemaOrg.tsx         # Structured data components
├── lib/                          # Utility libraries
│   ├── categories.ts             # Category names and images
│   ├── pinnedConfig.ts           # Pinned supplier configuration (StekloRoll, Artalico)
│   ├── seo/catalog.ts            # SEO metadata for categories
│   ├── seo/regions.ts            # Region definitions
│   └── validators/               # Input validators
├── data/                         # Data files (JSON)
│   ├── clean/suppliers_clean.json    # Main supplier database
│   └── published/whitelists/     # Whitelist data by category/region
├── public/                       # Static assets
│   └── blog/                     # Static HTML blog articles
├── content/                      # Content drafts (Markdown)
├── tests/                        # Playwright E2E tests
└── scripts/                      # Build scripts
    └── optimize-images.js        # Image optimization script
```

## Build and Development Commands

```bash
# Development server (runs on http://localhost:3000)
npm run dev

# Production build (includes image optimization)
npm run build

# Type checking only
npm run type-check

# Linting
npm run lint

# Run E2E tests (Playwright)
npm run test

# Full presubmit check (type-check + lint + test)
npm run presubmit

# Bundle analysis
npm run build:analyze
```

## Key Architecture Decisions

### Static Export
- The site uses `output: 'export'` for static site generation
- All pages are pre-rendered at build time
- Output directory: `dist/` (configured in `next.config.ts`)

### Data Sources
1. **Supplier Data**: Loaded from `data/clean/suppliers_clean.json`
2. **Whitelists**: Category/region-specific data in `data/published/whitelists/`
3. **Pinned Suppliers**: Hardcoded in `lib/pinnedConfig.ts` (StekloRoll and Artalico)

### SEO Architecture
- Centralized SEO configuration in `lib/seo/catalog.ts`
- Each category has predefined title, description, H1, H2s
- Schema.org structured data in `app/components/SchemaOrg.tsx`
- Sitemap generated dynamically in `app/sitemap.ts`
- Robots.txt generated in `app/robots.ts`

### Routing Structure
```
/                           # Homepage (Moscow suppliers)
/[category]/                # Category page (redirects to region if whitelist mode)
/[category]/[region]/       # Category + region page
/blog/                      # Blog listing
/blog/[slug]/               # Individual article (static HTML from public/blog/)
/calculator/                # Generic calculator
/prozrachnye-rolstavni/kalkulyator/  # StekloRoll calculator
/postavshchiki/             # All suppliers page
/kontakty/                  # Contact page
```

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit types for function parameters and returns
- Path alias `@/*` maps to project root

### Component Patterns
- Server Components by default (Next.js App Router)
- Use `'use client'` only when needed (interactivity, browser APIs)
- Props interfaces defined inline or in component file

### Naming Conventions
- Components: PascalCase (e.g., `CompanyCard.tsx`)
- Utilities: camelCase (e.g., `getCategoryMetadata`)
- Constants: UPPER_SNAKE_CASE (e.g., `CATEGORY_NAMES`)
- File names: kebab-case for pages, PascalCase for components

### CSS/Styling
- Tailwind CSS for all styling
- Utility-first approach
- Custom classes in `app/globals.css` (minimal)

## Content Policy (Important!)

### Blog Articles Location
**CRITICAL**: Long-form SEO articles must be placed in `public/blog/[slug]/index.html` as static HTML files.

- ❌ Do NOT put long articles in `app/blog/` as TSX components
- ✅ Use `public/blog/` for articles 1000+ words

### Article Requirements
1. **Minimum length**: 1000 words (`wc -w` to check)
2. **Optimal length**: 1500-2000 words
3. **Required sections**:
   - H1 with main keyword
   - Introduction (150-200 words)
   - H2: What is [product] (200 words)
   - H2/H3: Types/kinds (400-500 words)
   - Price comparison table
   - H2: Pros and cons (300 words)
   - H2: How to choose (200 words)
   - CTA block with StekloRoll link
   - Conclusion (100 words)

### Publishing Checklist
- [ ] Word count 1000+ (`wc -w public/blog/[slug]/index.html`)
- [ ] Has price table
- [ ] Has CTA to stekloroll.ru
- [ ] Unique title and description
- [ ] Links are valid (no 404)
- [ ] Breadcrumbs work
- [ ] Added to `app/blog/page.tsx` article list
- [ ] Build passes (`npm run build`)

## Testing Strategy

### E2E Tests (Playwright)
- Location: `tests/`
- Config: `playwright.config.ts`
- Browsers: Desktop Chrome, Mobile Chrome (Pixel 5)
- Base URL: http://localhost:3000
- Auto-starts dev server before tests

### Test Files
- `homepage.spec.ts` — Homepage, header, footer, navigation
- `blog.spec.ts` — Blog page and articles
- `search.spec.ts` — Search functionality

### Running Tests
```bash
# Run all tests
npm run test

# Run with UI
npx playwright test --ui

# Run specific test
npx playwright test tests/homepage.spec.ts
```

## Pinned Suppliers System

Two suppliers are prioritized across the catalog:

1. **StekloRoll** (`stekloroll.ru`)
   - Displayed with "РЕКОМЕНДУЕМ" and "ПРОИЗВОДИТЕЛЬ" badges
   - Always shown first in lists
   - Has calculator integration for transparent shutters

2. **Artalico** (`artalico.ru`)
   - Displayed with "ПРЕМИУМ" badge
   - Second position in lists

Configuration is in `lib/pinnedConfig.ts`. The `applyPinnedSuppliers()` function handles deduplication and ordering.

## Security Considerations

### Headers (configured in next.config.ts)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`

### External Links
- All external links use `target="_blank" rel="noopener noreferrer"`
- UTM parameters appended: `utm_source=stroysales&utm_medium=referral&utm_campaign=catalog`

### Environment Variables
Required in `.env` or `.env.local`:
```bash
NEXT_PUBLIC_SENTRY_DSN=          # Sentry error monitoring
SENTRY_AUTH_TOKEN=               # Sentry auth for source maps
```

## Environment Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment file:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with actual values
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

## Deployment

The site is configured for deployment on Vercel:
- Build command: `npm run build`
- Output directory: `dist/`
- Static export compatible

See `vercel.json` for build configuration.

## Common Tasks

### Add a New Category
1. Add entry to `CATEGORIES` array in `lib/seo/catalog.ts`
2. Add name and image in `lib/categories.ts`
3. Create OG image at `/public/og-[category].jpg`
4. Add to sitemap in `app/sitemap.ts`

### Add a New Region
1. Add to `CANONICAL_REGIONS` in `lib/seo/regions.ts`
2. Create whitelist JSON in `data/published/whitelists/[category]_[region].json`
3. Add to sitemap

### Update Pinned Suppliers
Edit `PINNED_DATA` and `PINNED_CONFIG` in `lib/pinnedConfig.ts`.

## Troubleshooting

### Build Failures
- Check TypeScript errors: `npm run type-check`
- Check for missing images in `public/`
- Verify JSON files in `data/` are valid

### Test Failures
- Ensure dev server is not already running
- Check that port 3000 is available
- Run `npx playwright install` if browsers missing

### Content Issues
- Verify article word count: `for f in public/blog/*/index.html; do echo "$f: $(wc -w < $f) words"; done`
- Check for broken links: `find public/blog -name "index.html" -exec grep -o 'href="[^"]*"' {} \;`
- Verify CTA presence: `grep -r "stekloroll" public/blog/*/index.html`
