'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES, CANONICAL_REGIONS } from '@/lib/seo/catalog'

export default function SearchBar() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedRegion, setSelectedRegion] = useState('all')

  const handleSearch = () => {
    if (selectedCategory !== 'all' && selectedRegion !== 'all') {
      router.push(`/${selectedCategory}/${selectedRegion}/`)
    } else if (selectedCategory !== 'all') {
      router.push(`/${selectedCategory}/`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm sticky top-14 z-40">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Все услуги</option>
            {CATEGORIES.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">Все регионы</option>
            {CANONICAL_REGIONS.map(r => (
              <option key={r.slug} value={r.slug}>{r.name}</option>
            ))}
          </select>
          
          <button 
            onClick={handleSearch}
            className="md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition"
          >
            Найти
          </button>
        </div>
      </div>
    </div>
  )
}
