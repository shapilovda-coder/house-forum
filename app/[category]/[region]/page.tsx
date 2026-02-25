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

import fs from 'fs';
import path from 'path';

function whitelistPath(category: string, region: string) {
  return path.join(process.cwd(), 'data', 'whitelists', `${category}_${region}.json`);
}

function loadWhitelist(category: string, region: string) {
  const file = whitelistPath(category, region);

  if (!fs.existsSync(file)) return null; // файла нет → null (решение выше по коду)
  
  const raw = fs.readFileSync(file, 'utf-8');
  const data = JSON.parse(raw);

  // Если файл есть, но пустой — это осознанное "нет поставщиков", НЕ fallback
  return Array.isArray(data) ? data : [];
}

function loadWhitelistCombinations() {
  try {
    const whitelistsDir = path.join(process.cwd(), 'data', 'whitelists');
    if (!fs.existsSync(whitelistsDir)) return [];
    
    const files = fs.readdirSync(whitelistsDir);
    const combos: { category: string; region: string }[] = [];
    
    files.forEach((file: string) => {
      const match = file.match(/^(.+)_(.+)_urls\.json$/);
      if (match) {
        combos.push({ category: match[1], region: match[2] });
      }
    });
    
    return combos;
  } catch (e) {
    return [];
  }
}

export async function generateStaticParams() {
  const suppliers = loadSuppliers()
  
  // Generate from suppliers_clean.json
  const combos: { category: string; region: string }[] = []
  
  suppliers.forEach((s: any) => {
    s.categories.forEach((cat: any) => {
      const catSlug = cat.category?.slug || cat.slug || cat
      s.regions.forEach((reg: any) => {
        combos.push({ category: catSlug, region: reg.slug })
      })
    })
  })
  
  // Add whitelist combinations
  const whitelistCombos = loadWhitelistCombinations()
  combos.push(...whitelistCombos)
  
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
  
  // Check for whitelist first
  const whitelist = loadWhitelist(category, region)
  
  // Special cases: whitelist categories — only StekloRoll in recommended, no Artalico
  const showOnlyStekloRoll = (category === 'rolletnye-shkafy' || category === 'zashitnye-rolstavni' || category === 'prozrachnye-rolstavni') 
    && region === 'moskva-i-mo'
  
  // Auxiliary categories: no recommended section at all
  const hideRecommended = category === 'myagkie-okna' && region === 'moskva-i-mo'
  
  if (whitelist) {
    // Use whitelist data ONLY — no fallback to suppliers_clean.json
    const whitelistSuppliers = whitelist
      .filter((w: any) => w.parse_status === 'ok' || w.parse_status === 'partial')
      .map((w: any) => ({
        id: w.source_url,
        slug: w.display_domain,
        name: w.company_name || w.display_domain,
        website: w.source_url,
        domain_display: w.display_domain,
        phone: w.phones?.[0] || '',
        phones: w.phones || [],
        address: w.address,
        cities: [{ name: 'Москва', slug: null }],
        regions: [{ slug: region, name: regData.name }],
        categories: [{ category: { slug: category, name: catData.name } }],
        status: 'active',
        clicks: 0,
        is_verified: true
      }))
    
    return (
      <CategoryRegionPage 
        category={catData}
        region={regData}
        suppliers={whitelistSuppliers}
        cities={['Москва']}
        totalCount={whitelistSuppliers.length}
        showOnlyStekloRoll={showOnlyStekloRoll}
        hideRecommended={hideRecommended}
      />
    )
  }
  
  // Fallback to suppliers_clean.json ONLY if no whitelist
  const suppliers = loadSuppliers()
  const filteredSuppliers = suppliers.filter((s: any) => 
    s.categories.some((c: any) => (c.category?.slug || c.slug || c) === category) &&
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
  const citiesInRegion: string[] = Array.from(new Set(
    filteredSuppliers.flatMap((s: any) => s.cities.map((c: any) => c.name as string))
  ))
  
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
