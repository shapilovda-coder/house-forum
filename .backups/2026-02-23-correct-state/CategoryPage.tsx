'use client'

import { useState } from 'react'

interface Category {
  slug: string
  name: string
}

interface City {
  slug: string
  name: string
}

interface Company {
  id: number
  name: string
  slug: string
  phone: string
  website: string
  address: string | null
  rating: number
  cities: { name: string; slug: string }
  company_categories: { categories: { name: string; slug: string } }[]
}

interface CategoryPageProps {
  category: Category
  city?: City
  companies: Company[]
  categories: Category[]
}

export default function CategoryPage({ category, city, companies, categories }: CategoryPageProps) {
  const [sortBy, setSortBy] = useState('recommended')
  
  const title = city 
    ? `${category.name} в ${city.name}`
    : category.name
    
  const description = city
    ? `Найдите поставщиков ${category.name.toLowerCase()} в ${city.name}. Реальные цены, отзывы, контакты.`
    : `Каталог поставщиков ${category.name.toLowerCase()}. Реальные отзывы, цены от производителей.`

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <a href="/" className="text-xl font-bold text-blue-600">
              СтройСейлс
            </a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{category.name}</span>
            {city && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{city.name}</span>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            {description}
          </p>
          <div className="mt-6 flex gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">
              {companies.length} поставщиков
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold mb-3">Категории</h3>
              <ul className="space-y-2">
                {categories?.map(cat => (
                  <li key={cat?.slug || 'unknown'}>
                    <a
                      href={`/${cat?.slug}/`}
                      className={`block py-1 ${
                        cat?.slug === category?.slug
                          ? 'text-blue-600 font-medium'
                          : 'text-gray-600 hover:text-blue-600'
                      }`}
                    >
                      {cat?.name || 'Без названия'}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Companies */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Компании ({companies.length})
              </h2>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2"
              >
                <option value="recommended">Сначала рекомендуемые</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>

            <div className="space-y-4">
              {companies?.map(company => (
                <div
                  key={company?.id || Math.random()}
                  className="bg-white rounded-lg shadow-sm p-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {company?.name || 'Без названия'}
                      </h3>
                      {company?.address && (
                        <p className="text-gray-500 text-sm mt-1">
                          {company.address}
                        </p>
                      )}
                      <div className="flex gap-2 mt-2">
                        {company?.company_categories?.map((cc, i) => (
                          <span
                            key={i}
                            className="text-xs bg-gray-100 px-2 py-1 rounded"
                          >
                            {cc?.categories?.name || 'Услуга'}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      {company?.phone && (
                        <a
                          href={`tel:${company.phone}`}
                          className="text-blue-600 hover:underline block"
                        >
                          {company.phone}
                        </a>
                      )}
                      <a
                        href={company?.website || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-gray-500 hover:text-blue-600 mt-2 block"
                      >
                        На сайт →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
