'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import CompanyCard from './CompanyCard'
import CityFilter from './CityFilter'

interface CategoryRegionPageProps {
  category: {
    slug: string
    name: string
  }
  region: {
    slug: string
    name: string
  }
  suppliers: any[]
  cities: string[]
  totalCount: number
}

// Inner component that uses useSearchParams
function CategoryRegionContent({
  category,
  region,
  suppliers,
  cities,
  totalCount
}: CategoryRegionPageProps) {
  const searchParams = useSearchParams()
  const selectedCity = searchParams.get('city')
  
  // Filter by city if selected
  const filteredSuppliers = selectedCity 
    ? suppliers.filter(s => s.cities.some((c: any) => c.name === selectedCity))
    : suppliers
  
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange-500">Главная</Link>
        <span className="mx-2">/</span>
        <Link href={`/${category.slug}`} className="hover:text-orange-500">{category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{region.name}</span>
      </nav>

      {/* H1 */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category.name} в {region.name}
      </h1>
      
      <p className="text-gray-600 mb-6">
        Найдено {filteredSuppliers.length} поставщиков
        {selectedCity && ` в городе ${selectedCity}`}
      </p>
      
      {/* City Filter */}
      <CityFilter cities={cities} selectedCity={selectedCity} />
      
      {/* Suppliers List */}
      <div className="space-y-3">
        {filteredSuppliers.map(company => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      
      {filteredSuppliers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500">Нет поставщиков в выбранном городе</p>
          <Link 
            href={`/${category.slug}/${region.slug}`}
            className="text-orange-500 hover:underline mt-2 inline-block"
          >
            Показать все города
          </Link>
        </div>
      )}
      
      {/* SEO Text */}
      <div className="mt-12 prose max-w-none">
        <h2>О {category.name.toLowerCase()} в {region.name}</h2>
        <p>
          На этой странице представлены проверенные поставщики {category.name.toLowerCase()} 
          в {region.name}. Все компании проверены на наличие реальных отзывов и контактов.
        </p>
      </div>
    </>
  )
}

export default function CategoryRegionPage(props: CategoryRegionPageProps) {
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
        <Suspense fallback={<div className="text-center py-12">Загрузка...</div>}>
          <CategoryRegionContent {...props} />
        </Suspense>
      </div>
    </div>
  )
}
