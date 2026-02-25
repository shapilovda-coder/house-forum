import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES, CANONICAL_REGIONS, getCategoryRegionMetadata } from '@/lib/seo/catalog'
import CategoryRegionPage from '../../components/CategoryRegionPage'
import { isWhitelistMode, getCatalogMode } from '@/lib/catalogMode'
import { applyPinnedSuppliers, getPinnedForCategory } from '@/lib/pinnedConfig'
import fs from 'fs'
import path from 'path'

// TEMP build log flag (set to true for debugging)
const DEBUG_BUILD = true // Always log for visibility

function logBuild(category: string, region: string, mode: string, source: string, count: number) {
  if (DEBUG_BUILD) {
    console.log(`[BUILD] ${category}/${region} | mode=${mode} | source=${source} | count=${count}`)
  }
}

// Load catalog suppliers (catalog mode only)
function loadSuppliers() {
  const dataPath = path.join(process.cwd(), 'data', 'clean', 'suppliers_clean.json')
  if (!fs.existsSync(dataPath)) return []
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

// Load whitelist from published data
function loadWhitelist(category: string, region: string): any[] | null {
  const file = path.join(process.cwd(), 'data', 'published', 'whitelists', `${category}_${region}.json`)
  
  if (!fs.existsSync(file)) {
    return null // No whitelist file
  }
  
  const raw = fs.readFileSync(file, 'utf-8')
  const data = JSON.parse(raw)
  
  // Empty array = intentional "no suppliers"
  if (Array.isArray(data) && data.length === 0) {
    return []
  }
  
  return Array.isArray(data) ? data : null
}

// Generate static params from both catalog and whitelist
export async function generateStaticParams() {
  const combos: { category: string; region: string }[] = []
  
  // CATALOG MODE: generate from suppliers_clean.json
  const suppliers = loadSuppliers()
  suppliers.forEach((s: any) => {
    s.categories.forEach((cat: any) => {
      const catSlug = cat.category?.slug || cat.slug || cat
      // Skip whitelist categories for catalog generation
      if (isWhitelistMode(catSlug)) return
      s.regions.forEach((reg: any) => {
        combos.push({ category: catSlug, region: reg.slug })
      })
    })
  })
  
  // WHITELIST MODE: generate from existing whitelist files
  const whitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')
  if (fs.existsSync(whitelistsDir)) {
    const files = fs.readdirSync(whitelistsDir)
    files.forEach((file: string) => {
      // Match pattern: category_region.json (NOT _urls.json)
      const match = file.match(/^(.+)_(.+)\.json$/)
      if (match && !file.includes('_urls')) {
        combos.push({ category: match[1], region: match[2] })
      }
    })
  }
  
  // Unique
  const unique = [...new Map(combos.map(c => 
    [`${c.category}-${c.region}`, c]
  )).values()]
  
  return unique
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string; region: string }> 
}): Promise<Metadata> {
  const { category, region } = await params
  const meta = getCategoryRegionMetadata(category as any, region as any)
  
  if (!meta) {
    return { 
      title: 'СтройСейлс — каталог поставщиков',
      alternates: { canonical: `/${category}/${region}` }
    }
  }
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${category}/${region}` }
  }
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ category: string; region: string }> 
}) {
  const { category, region } = await params
  
  // Validate
  const catData = CATEGORIES.find(c => c.slug === category)
  const regData = CANONICAL_REGIONS.find(r => r.slug === region)
  
  if (!catData || !regData) {
    notFound()
  }
  
  const mode = getCatalogMode(category)
  
  // WHITELIST MODE: STRICT — NO FALLBACK EVER
  if (isWhitelistMode(category)) {
    const whitelist = loadWhitelist(category, region)
    
    // No whitelist file or empty = "Раздел скоро появится"
    if (whitelist === null || whitelist.length === 0) {
      logBuild(category, region, 'whitelist', 'none', 0)
      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{catData.name}</h1>
            <p className="text-gray-500 text-lg">Раздел скоро появится</p>
          </div>
        </div>
      )
    }
    
    // Map whitelist data to supplier format
    // Normalize parse_status and filter
    const ALLOWED_STATUSES = new Set(['ok', 'partial'])
    
    const processedEntries = whitelist.map((w: any) => {
      // Normalize parse_status
      let status = w.parse_status
      if (!status || typeof status !== 'string') {
        status = 'partial' // default for missing/null
      }
      status = status.toLowerCase().trim()
      
      return {
        ...w,
        parse_status_normalized: status,
        is_allowed: ALLOWED_STATUSES.has(status)
      }
    })
    
    // Build log for debugging
    const totalInFile = processedEntries.length
    const allowedEntries = processedEntries.filter((e: any) => e.is_allowed)
    const excludedEntries = processedEntries.filter((e: any) => !e.is_allowed)
    
    if (DEBUG_BUILD) {
      console.log(`[BUILD] ${category}/${region} whitelist:`)
      console.log(`  total in file: ${totalInFile}`)
      console.log(`  rendered: ${allowedEntries.length}`)
      console.log(`  excluded: ${excludedEntries.length}`)
      excludedEntries.forEach((e: any) => {
        console.log(`    - ${e.domain || e.display_domain || 'unknown'}: parse_status="${e.parse_status}" (normalized: "${e.parse_status_normalized}")`)
      })
    }
    
    // Map to supplier format
    const mappedSuppliers = allowedEntries.map((w: any) => ({
      id: w.url || w.source_url,
      slug: w.display_domain || w.domain,
      name: w.company_name || w.display_domain || w.domain,
      website: w.url || w.source_url,
      domain_display: w.display_domain || w.domain,
      phone: w.phones?.[0] || '',
      phones: w.phones || [],
      address: w.address,
      cities: [{ name: 'Москва', slug: null }],
      regions: [{ slug: region, name: regData.name }],
      categories: [{ category: { slug: category, name: catData.name } }],
      status: 'active',
      clicks: w.priority || 0,
      is_verified: true,
      is_pinned: w.is_pinned || false
    }))
    
    // Apply pinned suppliers (adds pinned not in list, reorders)
    const finalSuppliers = applyPinnedSuppliers(mappedSuppliers, category, region)
    
    logBuild(category, region, 'whitelist', 'published/whitelists', finalSuppliers.length)
    
    // UI flags based on pinned config
    const pinnedKeys = getPinnedForCategory(category, region)
    const showOnlyStekloRoll = pinnedKeys.length === 1 && pinnedKeys[0] === 'stekloroll'
    const hideRecommended = category === 'myagkie-okna' && pinnedKeys.length === 0
    
    return (
      <CategoryRegionPage 
        category={catData}
        region={regData}
        suppliers={finalSuppliers}
        cities={['Москва']}
        totalCount={finalSuppliers.length}
        showOnlyStekloRoll={showOnlyStekloRoll}
        hideRecommended={hideRecommended}
      />
    )
  }
  
  // CATALOG MODE: Load from suppliers_clean.json
  const suppliers = loadSuppliers()
  const filteredSuppliers = suppliers.filter((s: any) => 
    s.categories.some((c: any) => (c.category?.slug || c.slug || c) === category) &&
    s.regions.some((r: any) => r.slug === region) &&
    s.status === 'active'
  )
  
  // Apply pinned for catalog mode too
  const finalSuppliers = applyPinnedSuppliers(filteredSuppliers, category, region)
  
  const citiesInRegion: string[] = Array.from(new Set(
    filteredSuppliers.flatMap((s: any) => s.cities.map((c: any) => c.name as string))
  ))
  
  logBuild(category, region, 'catalog', 'clean/suppliers_clean', finalSuppliers.length)
  
  return (
    <CategoryRegionPage 
      category={catData}
      region={regData}
      suppliers={finalSuppliers}
      cities={citiesInRegion}
      totalCount={finalSuppliers.length}
    />
  )
}
