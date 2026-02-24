import Link from 'next/link'
import HeroBanner from './components/HeroBanner'
import CategoryTiles from './components/CategoryTiles'
import SearchBar from './components/SearchBar'
import { CANONICAL_REGIONS } from '@/lib/seo/catalog'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Search Bar */}
      <SearchBar />

      {/* Regions CTA */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-blue-50 rounded-xl p-8 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Или выберите регион
          </h2>
          <p className="text-gray-600 mb-6">
            Найдите поставщиков рядом с вами
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {CANONICAL_REGIONS.map(region => (
              <Link
                key={region.slug}
                href={`/prozrachnye-rolstavni/${region.slug}/`}
                className="bg-white border border-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg hover:border-orange-400 hover:text-orange-600 transition"
              >
                {region.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 СтройСейлс — каталог поставщиков</p>
        </div>
      </footer>
    </div>
  )
}
