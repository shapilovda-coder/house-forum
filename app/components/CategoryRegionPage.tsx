'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import CompanyCard from './CompanyCard'

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
  seoMeta?: {
    title: string
    description: string
    h1: string
    h2: string[]
  } | null
}

// Inner component that uses useSearchParams
function CategoryRegionContent({
  category,
  region,
  suppliers,
  cities,
  totalCount,
  showOnlyStekloRoll,
  hideRecommended,
  seoMeta
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange-500">Главная</Link>
        <span className="mx-2">/</span>
        <Link href={`/${category.slug}`} className="hover:text-orange-500">{category.name}</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{region.nameShort}</span>
      </nav>

      {/* City Filter - компактные чипсы, без заголовка */}
      {cities.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Link
            href={`/${category.slug}/${region.slug}/`}
            className={`text-sm px-3 py-1.5 rounded-full transition ${
              !validCity 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все
          </Link>
          {cities.map(city => (
            <Link
              key={city}
              href={`/${category.slug}/${region.slug}/?city=${encodeURIComponent(city)}`}
              className={`text-sm px-3 py-1.5 rounded-full transition ${
                validCity === city 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {city}
            </Link>
          ))}
        </div>
      )}
      
      {/* Recommended Section - ONLY pinned suppliers */}
      {!hideRecommended && recommendedSuppliers.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">{seoMeta?.h2[0] || 'Рекомендуемые'}</h2>
          <div className="space-y-3">
            {recommendedSuppliers.map(company => (
              <CompanyCard key={company.id} company={company} categorySlug={category.slug} />
            ))}
          </div>
        </div>
      )}
      
      {/* Main Companies Section - NO pinned suppliers here */}
      {mainSuppliers.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            {seoMeta?.h2[1] || 'Все поставщики'}
          </h2>
          <div className="space-y-3">
            {mainSuppliers.map(company => (
              <CompanyCard key={company.id} company={company} categorySlug={category.slug} />
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
    </div>
  )
}

export default function CategoryRegionPage(props: CategoryRegionPageProps) {
  return (
    <Suspense fallback={<div className="text-center py-12">Загрузка...</div>}>
      <CategoryRegionContent {...props} />
    </Suspense>
  )
}
