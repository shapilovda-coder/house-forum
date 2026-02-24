'use client'

import Link from 'next/link'

interface CompanyCardProps {
  company: {
    id: number
    slug: string
    name: string
    root_domain: string | null
    website: string
    phones: string[]
    emails: string[]
    cities: { name: string; slug: string | null }[]
    address: string | null
    is_verified: boolean
    clicks: number
  }
}

// Normalize phone for tel: link
function normalizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '')
}

// Format domain for display
function formatDomain(website: string | null): string {
  if (!website) return ''
  return website
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
}

export default function CompanyCard({ company }: CompanyCardProps) {
  const isStekloRoll = company.slug?.includes('stekloroll')
  const isArtalico = company.slug?.includes('artalico')
  const isPriority = isStekloRoll || isArtalico
  
  const displayDomain = formatDomain(company.website)
  const utmParams = 'utm_source=stroysales&utm_medium=referral&utm_campaign=catalog'
  
  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${isPriority ? 'ring-2 ring-orange-400 ring-offset-2' : ''}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          {/* Badges for priority companies */}
          {isPriority && (
            <div className="flex gap-2 mb-2">
              {isStekloRoll && (
                <>
                  <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-semibold">РЕКОМЕНДУЕМ</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-semibold">ПРОИЗВОДИТЕЛЬ</span>
                </>
              )}
              {isArtalico && (
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded font-semibold">ПРЕМИУМ</span>
              )}
            </div>
          )}
          
          {/* Domain */}
          <h3 className="font-semibold text-gray-900 text-lg">{displayDomain}</h3>
          
          {/* Cities badges */}
          {company.cities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {company.cities.map(city => (
                <span key={city.name} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  {city.name}
                </span>
              ))}
            </div>
          )}
          
          {/* Phone */}
          {company.phones[0] && (
            <p className="text-sm text-gray-600 mt-1">
              📞 {company.phones[0]}
            </p>
          )}
          
          {/* Address */}
          {company.address && (
            <p className="text-sm text-gray-500 mt-1">
              📍 {company.address}
            </p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="md:w-44 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 space-y-2">
          {isPriority ? (
            <>
              <a 
                href={`${company.website}?${utmParams}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition"
              >
                Перейти на сайт
              </a>
              <button
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded transition"
                onClick={() => {/* Calculator modal */}}
              >
                Рассчитать цену
              </button>
            </>
          ) : (
            <a 
              href={`${company.website}?${utmParams}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition"
            >
              Перейти на сайт
            </a>
          )}
          
          {company.phones[0] && (
            <a 
              href={`tel:${normalizePhone(company.phones[0])}`}
              className="block w-full text-center py-2 text-sm text-gray-600 hover:text-orange-500 border border-gray-300 rounded transition"
            >
              Позвонить
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
