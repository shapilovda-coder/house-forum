'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { getCategoryName, getRegionName } from '@/lib/categories'

interface Supplier {
  domain: string
  displayDomain: string
  name: string
  phones: string[]
  address: string | null
  categories: string[]
  regions: string[]
  website: string
  isPinned: boolean
}

interface AllSuppliersPageProps {
  suppliers: Supplier[]
  categories: { slug: string; name: string }[]
  regions: { slug: string; name: string }[]
}

function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return `+${cleaned[0]} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`
  }
  return phone
}

export default function AllSuppliersPage({ suppliers, categories, regions }: AllSuppliersPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedRegion, setSelectedRegion] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      if (selectedCategory !== 'all' && !s.categories.includes(selectedCategory)) return false
      if (selectedRegion !== 'all' && !s.regions.includes(selectedRegion)) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          s.domain.toLowerCase().includes(query) ||
          s.name.toLowerCase().includes(query) ||
          s.phones.some(p => p.includes(query))
        )
      }
      return true
    })
  }, [suppliers, selectedCategory, selectedRegion, searchQuery])

  const uniqueCount = filteredSuppliers.length
  const pinnedCount = filteredSuppliers.filter(s => s.isPinned).length

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Все поставщики</h1>
          <p className="text-gray-600">
            Всего уникальных поставщиков: <span className="font-bold text-blue-600">{uniqueCount}</span>
            {pinnedCount > 0 && (
              <span className="text-sm text-gray-500 ml-2">(включая {pinnedCount} рекомендуемых)</span>
            )}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
          <div className="flex flex-wrap gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Поиск по домену или телефону..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все категории</option>
              {categories.map(c => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>

            {/* Region filter */}
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Все регионы</option>
              {regions.map(r => (
                <option key={r.slug} value={r.slug}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSuppliers.map((supplier, idx) => (
            <div 
              key={`${supplier.domain}-${idx}`} 
              className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow ${
                supplier.isPinned ? 'ring-2 ring-orange-400 ring-offset-2' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 truncate" title={supplier.displayDomain}>
                  {supplier.displayDomain}
                </h3>
                {supplier.isPinned && (
                  <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded font-semibold">
                    Рекомендуем
                  </span>
                )}
              </div>

              {supplier.name && supplier.name !== supplier.domain && (
                <p className="text-sm text-gray-600 mb-2 truncate">{supplier.name}</p>
              )}

              {/* Human-readable category tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {supplier.categories.slice(0, 3).map(catSlug => (
                  <span 
                    key={catSlug}
                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded"
                  >
                    {getCategoryName(catSlug)}
                  </span>
                ))}
                {supplier.categories.length > 3 && (
                  <span className="text-xs text-gray-500">+{supplier.categories.length - 3}</span>
                )}
              </div>

              {supplier.phones.length > 0 && (
                <p className="text-sm text-gray-700 mb-2">
                  📞 {formatPhone(supplier.phones[0])}
                </p>
              )}

              {supplier.regions.length > 0 && (
                <p className="text-xs text-gray-500 mb-3">
                  📍 {supplier.regions.map(getRegionName).join(', ')}
                </p>
              )}

              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-medium py-2 rounded transition"
              >
                Перейти на сайт
              </a>
            </div>
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Поставщики не найдены</p>
          </div>
        )}

        {/* Back to home */}
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← На главную
          </Link>
        </div>
      </div>
    </div>
  )
}
