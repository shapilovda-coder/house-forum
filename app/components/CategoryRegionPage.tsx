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
    namePrepositional?: string
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
  
  // Validate: city must belong to current region's cities
  const validCity = selectedCity && cities.includes(selectedCity) 
    ? selectedCity 
    : null
  
  // Filter by city if valid
  const filteredSuppliers = validCity 
    ? suppliers.filter(s => s.cities.some((c: any) => c.name === validCity))
    : suppliers
  
  // Use prepositional case for region name
  const regionNamePrepositional = region.namePrepositional || region.name
  
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

      {/* H1 with prepositional case */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category.name} в {regionNamePrepositional}
      </h1>
      
      <p className="text-gray-600 mb-6">
        Найдено {filteredSuppliers.length} поставщиков
        {validCity && ` в городе ${validCity}`}
      </p>
      
      {/* City Filter - only show cities from this region */}
      <CityFilter cities={cities} selectedCity={validCity} />
      
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
        <h2>О {category.name.toLowerCase()} в {regionNamePrepositional}</h2>
        <p>
          На этой странице представлены проверенные поставщики {category.name.toLowerCase()} 
          в {regionNamePrepositional}. Все компании проверены на наличие реальных отзывов и контактов.
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
