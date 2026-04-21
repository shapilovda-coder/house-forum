'use client'

import Link from 'next/link'
import { CATEGORIES } from '@/lib/seo/catalog'

const CATEGORY_PHOTOS: Record<string, string> = {
  'prozrachnye-rolstavni': '/categories/prozrachnye.webp',
  'zashchitnye-rolstavni': '/categories/zashchitnye.webp',
  'bezramnoe-osteklenie': '/categories/bezramnoe.webp',
  'vorota': '/categories/vorota.webp',
  'myagkie-okna': '/categories/myagkie.webp',
  'rolletnye-shkafy': '/categories/rolletnye.webp',
  'ofisnye-peregorodki': '/categories/ofisnye.webp',
}

export default function CategoryTiles() {
  const firstRow = CATEGORIES.slice(0, 4)
  const secondRow = CATEGORIES.slice(4, 7)

  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          {firstRow.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="relative w-full aspect-square">
                <img
                  src={CATEGORY_PHOTOS[cat.slug] || '/categories/default.jpg'}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs font-semibold text-center leading-tight block text-white">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto mt-3">
          {secondRow.map((cat) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}/`}
              className="group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="relative w-full aspect-square">
                <img
                  src={CATEGORY_PHOTOS[cat.slug] || '/categories/default.jpg'}
                  alt={cat.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <span className="text-xs font-semibold text-center leading-tight block text-white">
                  {cat.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
