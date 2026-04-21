'use client'

import Link from 'next/link'
import { trackCatalogEvent } from '@/lib/analytics'
import { getSupplierProfileSlug } from '@/lib/supplierProfileSlug'
import { filterAddress } from '@/lib/validators/address'

interface CompanyCardProps {
  company: {
    id: number | string
    slug: string
    name: string
    root_domain?: string | null
    website: string
    domain_display?: string
    phone: string
    phones?: string[]
    emails?: string[]
    cities: { name: string; slug: string | null }[]
    address: string | null
    is_verified?: boolean
    clicks?: number
    is_pinned?: boolean
  }
  categorySlug?: string
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

// Get dedupe key for supplier
function getDedupeKey(company: any): string {
  const domain = company.domain_display || company.slug || company.website || ''
  return domain.toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]
}

export default function CompanyCard({ company, categorySlug }: CompanyCardProps) {
  const isStekloRoll = company.slug?.includes('stekloroll')
  const isArtalico = company.slug?.includes('artalico')
  const isPriority = isStekloRoll || isArtalico || company.is_pinned
  
  // Show calculator button ONLY for StekloRoll in prozrachnye-rolstavni
  const showCalculator = isStekloRoll && categorySlug === 'prozrachnye-rolstavni'
  
  // Use domain_display for UI (supports punycode decode), fallback to formatted website
  const displayDomain = company.domain_display || formatDomain(company.website)
  const utmParams = 'utm_source=stroysales&utm_medium=referral&utm_campaign=catalog'
  const phone = company.phones?.[0] || company.phone || ''
  
  // Filter address through validator (returns null if invalid)
  const validAddress = filterAddress(company.address)
  
  // Dedupe key for data attribute
  const dedupeKey = getDedupeKey(company)
  const profileHref = `/postavshchiki/${getSupplierProfileSlug(company)}/`
  
  return (
    <div data-supplier-key={dedupeKey} className={`bg-white rounded-lg shadow-sm p-4 ${isPriority ? 'ring-2 ring-orange-400 ring-offset-2' : ''}`}>
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
              {!isStekloRoll && !isArtalico && company.is_pinned && (
                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded font-semibold">РЕКОМЕНДУЕМ</span>
              )}
            </div>
          )}
          
          {/* Domain */}
          <h3 className="font-semibold text-gray-900 text-lg">
            <Link href={profileHref} className="hover:text-blue-600 transition">
              {displayDomain}
            </Link>
          </h3>
          
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
          {phone && (
            <p className="text-sm text-gray-600 mt-1">
              📞 {phone}
            </p>
          )}
          
          {/* Address (filtered through validator) */}
          {validAddress && (
            <p className="text-sm text-gray-500 mt-1">
              📍 {validAddress}
            </p>
          )}
        </div>
        
        {/* Buttons */}
        <div className="md:w-44 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 space-y-2">
          <Link
            href={profileHref}
            onClick={() => trackCatalogEvent('supplier_profile_open', { supplier: dedupeKey, category: categorySlug || null })}
            className="block w-full border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-700 text-center font-semibold text-sm py-2 rounded transition"
          >
            Карточка
          </Link>
          {showCalculator ? (
            <>
              <a 
                href={`${company.website}?${utmParams}`}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                onClick={() => trackCatalogEvent('supplier_outbound_click', { supplier: dedupeKey, category: categorySlug || null })}
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition"
              >
                Перейти на сайт
              </a>
              <Link
                href="/prozrachnye-rolstavni/kalkulyator/"
                onClick={() => trackCatalogEvent('catalog_calculator_open', { supplier: dedupeKey, category: categorySlug || null })}
                className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold text-sm py-2 rounded transition"
              >
                Рассчитать цену
              </Link>
            </>
          ) : isPriority ? (
            <a 
              href={`${company.website}?${utmParams}`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => trackCatalogEvent('supplier_outbound_click', { supplier: dedupeKey, category: categorySlug || null })}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition"
            >
              Перейти на сайт
            </a>
          ) : (
            <a 
              href={`${company.website}?${utmParams}`}
              target="_blank"
              rel="nofollow sponsored noopener noreferrer"
              onClick={() => trackCatalogEvent('supplier_outbound_click', { supplier: dedupeKey, category: categorySlug || null })}
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition"
            >
              Перейти на сайт
            </a>
          )}
          
          {phone && (
            <a 
              href={`tel:${normalizePhone(phone)}`}
              onClick={() => trackCatalogEvent('supplier_phone_click', { supplier: dedupeKey, category: categorySlug || null })}
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
