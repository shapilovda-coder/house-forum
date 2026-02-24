import Link from 'next/link'
import CompanyCard from './CompanyCard'
import RegionSelector from './RegionSelector'
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
  // Get top 6 suppliers (StekloRoll, Artalico + top by clicks)
  const topSuppliers = suppliers.slice(0, 6)
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900">Строй<span className="text-orange-500">Сейлс</span></span>
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* H1 */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
        <p className="text-gray-600 mb-8">{category.description}</p>
        
        {/* Region Selector - Main CTA */}
        <RegionSelector 
          categorySlug={category.slug}
          availableRegions={availableRegions}
        />
        
        {/* Top/Recommended Suppliers */}
        {topSuppliers.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Рекомендуемые поставщики</h2>
            <div className="space-y-3">
              {topSuppliers.map(company => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>
          </div>
        )}
        
        {/* CTA to region pages */}
        <div className="bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Найдите поставщиков в вашем регионе
          </h3>
          <p className="text-gray-600 mb-4">
            Всего {totalCount} поставщиков в {availableRegions.length} регионах
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {availableRegions.map(regionSlug => {
              const region = CANONICAL_REGIONS.find(r => r.slug === regionSlug)
              return (
                <Link
                  key={regionSlug}
                  href={`/${category.slug}/${regionSlug}`}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
                >
                  {region?.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
