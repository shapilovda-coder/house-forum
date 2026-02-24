import Link from 'next/link'
import { CATEGORIES, CANONICAL_REGIONS } from '@/lib/seo/catalog'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">
              Строй<span className="text-orange-500">Сейлс</span>
            </span>
          </Link>
          <span className="text-sm text-gray-500 hidden sm:block">Каталог поставщиков</span>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Каталог поставщиков рольставней, ворот и остекления
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Проверенные компании в Москве, Санкт-Петербурге и других регионах
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/prozrachnye-rolstavni/"
              className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition"
            >
              Найти поставщика
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Categories Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Выберите категорию
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(category => (
              <Link
                key={category.slug}
                href={`/${category.slug}/`}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-md hover:ring-2 hover:ring-orange-400 transition text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-3 flex items-center justify-center group-hover:bg-orange-100 transition">
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.description.slice(0, 50)}...</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Regions CTA */}
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
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2026 СтройСейлс — каталог поставщиков</p>
        </div>
      </footer>
    </div>
  )
}
