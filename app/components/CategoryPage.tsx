import Link from 'next/link'
import CompanyCard from './CompanyCard'
import { CATEGORIES, CANONICAL_REGIONS } from '@/lib/seo/catalog'

interface CategoryPageProps {
  category: {
    slug: string
    name: string
    nameShort: string
    subtitle: string
    seoIntro: string
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
  // All suppliers for full list
  const allSuppliers = suppliers
  
  return (
    <>
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-orange-500">Главная</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{category.name}</span>
      </nav>

      {/* H1 - только название категории */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h1>
      
      {/* Subtitle - не H2 */}
      <p className="text-gray-600 mb-2">{category.subtitle}</p>
      
      {/* SEO intro */}
      <p className="text-gray-500 text-sm mb-6">{category.seoIntro}</p>
      
      {/* Region Selector */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Выберите регион</h2>
        <div className="flex flex-wrap items-center gap-2">
          {availableRegions.map(regionSlug => {
            const region = CANONICAL_REGIONS.find(r => r.slug === regionSlug)
            return (
              <Link
                key={regionSlug}
                href={`/${category.slug}/${regionSlug}/`}
                className="text-sm bg-gray-100 hover:bg-orange-100 text-gray-700 hover:text-orange-700 px-3 py-1 rounded-full transition"
              >
                {region?.nameShort}
              </Link>
            )
          })}
        </div>
      </div>
      
      {/* Companies Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Компании и контакты</h2>
        <p className="text-sm text-gray-500 mb-3">{totalCount} поставщиков</p>
        <div className="space-y-3">
          {allSuppliers.map(company => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      </div>
      
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
            <summary className="font-medium text-gray-900 cursor-pointer">Сколько стоят {category.name.toLowerCase()}?</summary>
            <p className="text-gray-600 mt-2">Цены зависят от размеров, материалов и сложности монтажа. Запросите расчёт у нескольких поставщиков для сравнения.</p>
          </details>
          <details className="bg-white rounded-lg p-3 border border-gray-200">
            <summary className="font-medium text-gray-900 cursor-pointer">Какие сроки изготовления?</summary>
            <p className="text-gray-600 mt-2">Стандартные сроки — 3–10 рабочих дней. Сложные проекты могут занять до 2–3 недель.</p>
          </details>
        </div>
      </div>
    </>
  )
}
