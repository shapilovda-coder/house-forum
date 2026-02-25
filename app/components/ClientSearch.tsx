'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface Company {
  id: number
  slug: string
  name: string
  website: string
  phone: string
  address: string | null
  rating: number
  clicks: number
  is_verified: boolean
}

interface ClientSearchProps {
  companies: Company[]
  categories: { slug: string; name: string }[]
}

export default function ClientSearch({ companies, categories }: ClientSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCompanies = useMemo(() => {
    let result = companies

    // Filter by category
    if (selectedCategory) {
      // This would need company_categories data
      // For now, simple search
    }

    // Search by text
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.address?.toLowerCase().includes(query) ||
        c.website?.toLowerCase().includes(query)
      )
    }

    // Sort by clicks (StekloRoll/Artalico first)
    return result.sort((a, b) => {
      if (a.slug.includes('stekloroll')) return -1
      if (b.slug.includes('stekloroll')) return 1
      if (a.slug.includes('artalico')) return -1
      if (b.slug.includes('artalico')) return 1
      return (b.clicks || 0) - (a.clicks || 0)
    })
  }, [companies, selectedCategory, searchQuery])

  return (
    <div>
      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Поиск по названию, городу..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat.slug}
            onClick={() => setSelectedCategory(
              selectedCategory === cat.slug ? null : cat.slug
            )}
            className={`px-3 py-1 rounded-full text-sm ${
              selectedCategory === cat.slug
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Companies */}
      <div className="space-y-4">
        {filteredCompanies.map(company => (
          <div
            key={company.id}
            className={`p-4 border rounded-lg ${
              company.slug.includes('stekloroll') || company.slug.includes('artalico')
                ? 'border-orange-400 ring-2 ring-orange-400'
                : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{company.name}</h3>
                {company.phone && (
                  <p className="text-sm text-gray-600">📞 {company.phone}</p>
                )}
                {company.address && (
                  <p className="text-sm text-gray-600">📍 {company.address}</p>
                )}
              </div>
              <a
                href={`${company.website}?utm_source=stroysales&utm_medium=referral`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm"
              >
                Перейти на сайт
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
