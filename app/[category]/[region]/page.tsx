import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CATEGORIES, CANONICAL_REGIONS, getCategoryRegionMetadata } from '@/lib/seo/catalog'
import CategoryRegionPage from '../../components/CategoryRegionPage'

function loadSuppliers() {
  const fs = require('fs')
  const path = require('path')
  const dataPath = path.join(process.cwd(), 'data', 'suppliers_clean.json')
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

export async function generateStaticParams() {
  const suppliers = loadSuppliers()
  
  // Generate only (category, region) pairs that have suppliers
  const combos: { category: string; region: string }[] = []
  
  suppliers.forEach((s: any) => {
    s.categories.forEach((cat: string) => {
      s.regions.forEach((reg: any) => {
        combos.push({ category: cat, region: reg.slug })
      })
    })
  })
  
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
      alternates: {
        canonical: `/${category}/${region}`
      }
    }
  }
  
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${category}/${region}`
    }
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
  
  // Load suppliers for this category + region
  const suppliers = loadSuppliers()
  const filteredSuppliers = suppliers.filter((s: any) => 
    s.categories.includes(category) &&
    s.regions.some((r: any) => r.slug === region) &&
    s.status === 'active'
  )
  
  // Sort
  const sortedSuppliers = filteredSuppliers.sort((a: any, b: any) => {
    if (a.slug?.includes('stekloroll')) return -1
    if (b.slug?.includes('stekloroll')) return 1
    if (a.slug?.includes('artalico')) return -1
    if (b.slug?.includes('artalico')) return 1
    return (b.clicks || 0) - (a.clicks || 0)
  })
  
  // Get cities in this region for filters
  const citiesInRegion = [...new Set(
    filteredSuppliers.flatMap((s: any) => s.cities.map((c: any) => c.name))
  )]
  
  return (
    <CategoryRegionPage 
      category={catData}
      region={regData}
      suppliers={sortedSuppliers}
      cities={citiesInRegion}
      totalCount={sortedSuppliers.length}
    />
  )
}
