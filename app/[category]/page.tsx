import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES, getCategoryMetadata } from '@/lib/seo/catalog'
import { CANONICAL_REGIONS } from '@/lib/seo/regions'
import CategoryPage from '../components/CategoryPage'
import CategoryCover from '../components/CategoryCover'
import { getCatalogMode, isWhitelistMode } from '@/lib/catalogMode'
import { getCategoryName, getCategoryImage } from '@/lib/categories'
import fs from 'fs'
import path from 'path'

// Load suppliers data (catalog mode only)
function loadSuppliers() {
  const dataPath = path.join(process.cwd(), 'data', 'clean', 'suppliers_clean.json')
  if (!fs.existsSync(dataPath)) return []
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

// Check if whitelist exists for category/region
function whitelistExists(category: string, region: string): boolean {
  const whitelistPath = path.join(process.cwd(), 'data', 'published', 'whitelists', `${category}_${region}.json`)
  return fs.existsSync(whitelistPath)
}

export async function generateStaticParams() {
  const suppliers = loadSuppliers()
  
  // All categories from suppliers
  const activeCategories: string[] = Array.from(new Set(
    suppliers.flatMap((s: any) => 
      s.categories.map((c: any) => c.category?.slug || c.slug || c)
    )
  ))
  
  return activeCategories.map((cat) => ({ category: cat }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}): Promise<Metadata> {
  const { category } = await params
  const meta = getCategoryMetadata(category as any)
  
  if (!meta) {
    return { title: 'СтройСейлс — каталог поставщиков' }
  }
  
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ category: string }> 
}) {
  const { category } = await params
  
  // Validate category exists
  const catData = CATEGORIES.find(c => c.slug === category)
  if (!catData) {
    notFound()
  }
  
  const mode = getCatalogMode(category)
  
  // WHITELIST MODE: Show region selector or redirect to single region
  if (isWhitelistMode(category)) {
    // Find regions with whitelists
    const regionsWithWhitelist = CANONICAL_REGIONS.filter(r => 
      whitelistExists(category, r.slug)
    )
    
    // If only one region, redirect directly
    if (regionsWithWhitelist.length === 1) {
      redirect(`/${category}/${regionsWithWhitelist[0].slug}/`)
    }
    
    // Multiple regions: show region selector page
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Category Cover */}
          {(() => {
            const imageSrc = getCategoryImage(category)
            return imageSrc ? (
              <CategoryCover
                title={catData.name}
                description={`Каталог поставщиков ${catData.name.toLowerCase()}`}
                imageSrc={imageSrc}
                imageAlt={catData.name}
              />
            ) : null
          })()}
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{catData.name}</h1>
          <p className="text-gray-600 mb-8">Выберите регион:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regionsWithWhitelist.map(region => (
              <Link
                key={region.slug}
                href={`/${category}/${region.slug}/`}
                className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-blue-600">{region.name}</h2>
              </Link>
            ))}
          </div>
          {regionsWithWhitelist.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Раздел скоро появится</p>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  // CATALOG MODE: Load from suppliers_clean.json
  const suppliers = loadSuppliers()
  const categorySuppliers = suppliers.filter((s: any) => 
    s.categories.some((c: any) => (c.category?.slug || c.slug || c) === category) && 
    s.status === 'active'
  )
  
  // Sort: StekloRoll, Artalico first, then by clicks
  const sortedSuppliers = categorySuppliers.sort((a: any, b: any) => {
    if (a.slug?.includes('stekloroll')) return -1
    if (b.slug?.includes('stekloroll')) return 1
    if (a.slug?.includes('artalico')) return -1
    if (b.slug?.includes('artalico')) return 1
    return (b.clicks || 0) - (a.clicks || 0)
  })
  
  // Get available regions for this category
  const availableRegions: string[] = Array.from(new Set(
    categorySuppliers.flatMap((s: any) => s.regions.map((r: any) => r.slug as string))
  ))
  
  return (
    <CategoryPage 
      category={catData}
      suppliers={sortedSuppliers}
      availableRegions={availableRegions}
      totalCount={sortedSuppliers.length}
    />
  )
}
