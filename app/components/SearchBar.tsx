'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CATEGORIES } from '@/lib/seo/catalog'

export default function SearchBar() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleSearch = () => {
    if (selectedCategory !== 'all') {
      router.push(`/${selectedCategory}/`)
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm">
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
