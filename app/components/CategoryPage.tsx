import Link from 'next/link'
import CompanyCard from './CompanyCard'
import { CATEGORIES, CANONICAL_REGIONS } from '@/lib/seo/catalog'

interface CategoryPageProps {
  category: {
    slug: string
    name: string
    description: string
  }
  suppliers: any[]
  availableRegions: string[]
  totalCount: number
}

export default function CategoryPage({ 
  category, 
  suppliers, 
  availableRegions,
  totalCount 
}: CategoryPageProps) {
  // Get top 6 suppliers
  const topSuppliers = suppliers.slice(0, 6)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Строй<span className="text-orange-500">Сейлс</span></span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <nav className="text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-orange-500">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600 mb-4">{category.description}</p>
        
        {/* Compact Region Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-gray-600">Выберите регион:</span>
            {availableRegions.map(regionSlug => {
              const region = CANONICAL_REGIONS.find(r => r.slug === regionSlug)
              return (
                <Link
                  key={regionSlug}
                  href={`/${category.slug}/${regionSlug}/`}
                  className="text-sm bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1 rounded-full transition"
                >
                  {region?.name}
                </Link>
              )
            })}
          </div>
        </div>
        
        {/* Top Suppliers */}
        {topSuppliers.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-gray-900">Рекомендуемые поставщики</h2>
              <span className="text-sm text-gray-500">{totalCount} компаний</span>
            </div>
            <div className="space-y-3">
              {topSuppliers.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
