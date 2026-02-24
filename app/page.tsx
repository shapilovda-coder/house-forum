import Link from 'next/link'
import HeroBanner from './components/HeroBanner'
import CategoryTiles from './components/CategoryTiles'
import SearchBar from './components/SearchBar'
import CompanyCard from './components/CompanyCard'
import { CANONICAL_REGIONS } from '@/lib/seo/catalog'

// Load suppliers for homepage
function loadSuppliers() {
  try {
    const fs = require('fs')
    const path = require('path')
    const dataPath = path.join(process.cwd(), 'data', 'suppliers_clean.json')
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    return data.filter((s: any) => s.status === 'active')
  } catch (e) {
    return []
  }
}

export default function HomePage() {
  const suppliers = loadSuppliers()
  
  // Sort: StekloRoll, Artalico first, then by clicks
  const sortedSuppliers = suppliers.sort((a: any, b: any) => {
    if (a.slug?.includes('stekloroll')) return -1
    if (b.slug?.includes('stekloroll')) return 1
    if (a.slug?.includes('artalico')) return -1
    if (b.slug?.includes('artalico')) return 1
    return (b.clicks || 0) - (a.clicks || 0)
  })
  
  // Top 6 for homepage
  const topSuppliers = sortedSuppliers.slice(0, 6)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - sticky */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 2.2L18.5 9H5.5L12 5.2zM6 19v-9h12v9H6z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Строй<span className="text-orange-500">Сейлс</span>
            </span>
          </Link>
          <span className="text-sm text-gray-500 hidden sm:block">Каталог поставщиков</span>
        </div>
      </header>

      {/* Hero */}
      <HeroBanner />

      {/* Category Tiles */}
      <CategoryTiles />

      {/* Search Bar - sticky */}
      <SearchBar />

      {/* Suppliers List */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Рекомендуемые поставщики</h2>
          <span className="text-sm text-gray-500">{suppliers.length}+ компаний</span>
        </div>
        
        <div className="space-y-3">
          {topSuppliers.map((company: any) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link
            href="/prozrachnye-rolstavni/"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Смотреть всех поставщиков
          </Link>
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 СтройСейлс — каталог поставщиков</p>
        </div>
      </footer>
    </div>
  )
}
