import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CATEGORIES, getCategoryMetadata } from '@/lib/seo/catalog'
import CategoryPage from '../components/CategoryPage'

// Load suppliers data
function loadSuppliers() {
  const fs = require('fs')
  const path = require('path')
  const dataPath = path.join(process.cwd(), 'data', 'suppliers_clean.json')
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

export async function generateStaticParams() {
  const suppliers = loadSuppliers()
  
  // Only categories that have suppliers
  const activeCategories: string[] = Array.from(new Set(
    suppliers.flatMap((s: any) => s.categories as string[]).flat()
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
  
  // Load suppliers for this category
  const suppliers = loadSuppliers()
  const categorySuppliers = suppliers.filter((s: any) => 
    s.categories.includes(category) && s.status === 'active'
  )
  
  // Sort: StekloRoll, Artalico first, then by clicks
  const sortedSuppliers = categorySuppliers.sort((a: any, b: any) => {
    if (a.slug?.includes('stekloroll')) return -1
    if (b.slug?.includes('stekloroll')) return 1
    if (a.slug?.includes('artalico')) return -1
    if (b.slug?.includes('artalico')) return 1
    return (b.clicks || 0) - (a.clicks || 0)
  })
  
  // Get available regions for this category (from regions objects)
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
