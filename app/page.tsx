import Link from 'next/link'
import CategoryTiles from './components/CategoryTiles'
import SearchBar from './components/SearchBar'
import CompanyCard from './components/CompanyCard'
import { CANONICAL_REGIONS } from '@/lib/seo/catalog'
import { applyPinnedSuppliers } from '@/lib/pinnedConfig'
import fs from 'fs'
import path from 'path'

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

export default function HomePage() {
  const suppliers = loadMoscowWhitelists()
  
  // Apply pinned: Stekloroll #1, Artalico #2 for homepage
  const finalSuppliers = applyPinnedSuppliers(suppliers, 'prozrachnye-rolstavni', 'moskva-i-mo')
  
  return (
    <>
      {/* Compact Hero - No SVG */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-6 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-xl md:text-3xl font-bold text-white mb-2">
            Каталог проверенных поставщиков рольставней, ворот и остекления
          </h1>
          <p className="text-base text-blue-100">
            400+ компаний в Москве, Санкт-Петербурге и других регионах
          </p>
        </div>
      </div>

      {/* Category Tiles */}
      <CategoryTiles />

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
