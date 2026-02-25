'use client'

import Link from 'next/link'
import { CANONICAL_REGIONS } from '@/lib/seo/catalog'

interface RegionSelectorProps {
  categorySlug: string
  availableRegions: string[]  // ['moskva-i-mo', 'spb-lo']
}

export default function RegionSelector({ categorySlug, availableRegions }: RegionSelectorProps) {
  const regions = CANONICAL_REGIONS.filter(r => availableRegions.includes(r.slug))
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Выберите регион
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {regions.map(region => (
          <Link
            key={region.slug}
            href={`/${categorySlug}/${region.slug}`}
            className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-orange-400 hover:shadow-md transition"
          >
            <div>
              <span className="font-medium text-gray-900">{region.name}</span>
            </div>
            <svg 
              className="w-5 h-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  )
}
