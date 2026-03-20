import Link from 'next/link'
import CategoryTiles from './components/CategoryTiles'
import SearchBar from './components/SearchBar'
import CompanyCard from './components/CompanyCard'
import { CANONICAL_REGIONS } from '@/lib/seo/catalog'
import { applyPinnedSuppliers } from '@/lib/pinnedConfig'
import { getHomeMetadata } from '@/lib/seo/catalog'
import fs from 'fs'
import path from 'path'
import type { Metadata } from 'next'

// Load all Moscow whitelist suppliers for homepage
function loadMoscowWhitelists() {
  const whitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')
  if (!fs.existsSync(whitelistsDir)) return []
  
  const allSuppliers: any[] = []
  const seenDomains = new Set<string>()
  
  const files = fs.readdirSync(whitelistsDir).filter(f => 
    f.endsWith('_moskva-i-mo.json') && !f.includes('_urls')
  )
  
  for (const file of files) {
    try {
      const raw = fs.readFileSync(path.join(whitelistsDir, file), 'utf-8')
      const data = JSON.parse(raw)
      if (!Array.isArray(data)) continue
      
      // Filter valid entries
      const valid = data.filter((w: any) => {
        const domain = (w.display_domain || w.domain || '').toLowerCase()
        if (!domain || seenDomains.has(domain)) return false
        
        // Check parse_status
        const status = (w.parse_status || 'partial').toLowerCase().trim()
        if (!['ok', 'partial'].includes(status)) return false
        
        seenDomains.add(domain)
        return true
      })
      
      allSuppliers.push(...valid.map((w: any) => ({
        id: w.url || w.source_url,
        slug: w.display_domain || w.domain,
        name: w.company_name || w.display_domain || w.domain,
        website: w.url || w.source_url,
        domain_display: w.display_domain || w.domain,
        phone: w.phones?.[0] || '',
        phones: w.phones || [],
        address: w.address,
        cities: [{ name: 'Москва', slug: null }],
        regions: [{ slug: 'moskva-i-mo', name: 'Москва и Московская область' }],
        categories: [],
        status: 'active',
        clicks: w.priority || 0,
        is_verified: true
      })))
    } catch (e) {
      console.error(`Error loading ${file}:`, e)
    }
  }
  
  return allSuppliers
}

// Generate metadata for home page
export async function generateMetadata(): Promise<Metadata> {
  const seo = getHomeMetadata();
  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function HomePage() {
  const suppliers = loadMoscowWhitelists()
  const seo = getHomeMetadata();
  
  // Apply pinned: Stekloroll #1, Artalico #2 for homepage
  const finalSuppliers = applyPinnedSuppliers(suppliers, 'prozrachnye-rolstavni', 'moskva-i-mo')
  
  return (
    <>
      {/* Compact Hero - No SVG */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
            {seo.h1}
          </h1>
          <p className="text-base text-blue-100">
            400+ компаний в Москве, Санкт-Петербурге и других регионах
          </p>
        </div>
      </div>

      {/* Category Tiles */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{seo.h2[0]}</h2>
        <CategoryTiles />
      </div>

      {/* Search Bar - sticky */}
      <SearchBar />

      {/* Full Suppliers List */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Поставщики в Москве и МО</h2>
          <span className="text-sm text-gray-500">{finalSuppliers.length} компаний</span>
        </div>
        
        <div className="space-y-3">
          {finalSuppliers.map((company: any) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{seo.h2[1]}</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Выберите категорию</h3>
              <p className="text-sm text-gray-600">Найдите нужный тип остекления или рольставней</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Сравните поставщиков</h3>
              <p className="text-sm text-gray-600">Изучите контакты, сайты и предложения компаний</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Свяжитесь напрямую</h3>
              <p className="text-sm text-gray-600">Получите расчёт стоимости от выбранного подрядчика</p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Regions */}
      <div className="max-w-5xl mx-auto px-4 pb-8">
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Популярные регионы:</p>
          <div className="flex flex-wrap gap-2">
            {CANONICAL_REGIONS.map(region => (
              <Link
                key={region.slug}
                href={`/prozrachnye-rolstavni/${region.slug}/`}
                className="text-sm text-blue-600 hover:text-orange-500 transition"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
