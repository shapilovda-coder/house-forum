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
    nameShort: string
  }
  region: {
    slug: string
    name: string
    nameShort: string
    namePrepositional?: string
  }
  suppliers: any[]
  cities: string[]
  totalCount: number
  showOnlyStekloRoll?: boolean
  hideRecommended?: boolean
}

// Inner component that uses useSearchParams
function CategoryRegionContent({
  category,
  region,
  suppliers,
  cities,
  totalCount,
  showOnlyStekloRoll,
  hideRecommended
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
  
  // STRICT SEPARATION: recommended (is_pinned) vs main list
  const recommendedSuppliers = filteredSuppliers.filter(s => s.is_pinned)
  const mainSuppliers = filteredSuppliers.filter(s => !s.is_pinned)
  
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange-500">Главная</Link>
        <span className="mx-2">/</span>
        <Link href={`/${category.slug}`} className="hover:text-orange-500">{category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{region.nameShort}</span>
      </nav>

      {/* H1 - Категория — Регион коротко */}
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {category.nameShort} — {region.nameShort}
      </h1>
      
      {/* Subtitle */}
      <p className="text-gray-600 mb-2">Каталог поставщиков, цены и контакты.</p>
      
      {/* Count */}
      <p className="text-gray-500 text-sm mb-6">
        Найдено {filteredSuppliers.length} поставщиков
        {validCity && ` в городе ${validCity}`}
      </p>
      
      {/* City Filter */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Фильтр по городу</h2>
        <CityFilter cities={cities} selectedCity={validCity} />
      </div>
      
      {/* Recommended Section - ONLY pinned suppliers */}
      {!hideRecommended && recommendedSuppliers.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Рекомендуемые</h2>
          <div className="space-y-3">
            {recommendedSuppliers.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      )}
      
      {/* Main Companies Section - NO pinned suppliers here */}
      {mainSuppliers.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Все поставщики
          </h2>
          <div className="space-y-3">
            {mainSuppliers.map(company => (
              <CompanyCard key={company.id} company={company} />
            ))}
          </div>
        </div>
      )}
      
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
      
      {/* How to choose */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Как выбрать подрядчика</h2>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Проверьте наличие реальных отзывов</li>
          <li>Запросите примеры выполненных работ</li>
          <li>Сравните цены у 3–5 поставщиков</li>
          <li>Уточните сроки изготовления и монтажа</li>
        </ul>
      </div>
      
      {/* FAQ */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Вопросы и ответы</h2>
        <div className="space-y-3 text-sm">
          <details className="bg-white rounded-lg p-3 border border-gray-200">
            <summary className="font-medium text-gray-900 cursor-pointer">Сколько стоят {category.name.toLowerCase()} в {region.nameShort}?</summary>
            <p className="text-gray-600 mt-2">Цены зависят от размеров, материалов и сложности монтажа. Запросите расчёт у нескольких поставщиков для сравнения.</p>
          </details>
          <details className="bg-white rounded-lg p-3 border border-gray-200">
            <summary className="font-medium text-gray-900 cursor-pointer">Какие сроки изготовления в {region.nameShort}?</summary>
            <p className="text-gray-600 mt-2">Стандартные сроки — 3–10 рабочих дней. Сложные проекты могут занять до 2–3 недель.</p>
          </details>
        </div>
      </div>
    </>
  )
}

export default function CategoryRegionPage(props: CategoryRegionPageProps) {
  return (
    <>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-12">Загрузка...</div>}>
          <CategoryRegionContent {...props} />
        </Suspense>
      </div>
    </>
  )
}
