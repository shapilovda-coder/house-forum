'use client'

import { useState, useMemo, useEffect } from 'react'
import CalculatorModal from './CalculatorModal'
import { createClient } from '@supabase/supabase-js'

// Supabase client для клиентской загрузки
const supabaseClient = createClient(
  'https://zzellrqkamskeftyprkv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDMyOTIsImV4cCI6MjA4NzI3OTI5Mn0.vNrzaaOWG2cDBCDcrQISN_R2PgKb0XekNTQAndLhNy8'
)

interface Company {
  id: number
  name: string
  slug: string
  phone: string
  website: string
  address: string
  rating: number
  clicks: number
  is_verified: boolean
  cities: { name: string; slug: string }
  company_categories: { categories: { name: string; slug: string } }[]
  _groupCount?: number
}

interface Category {
  id: number
  name: string
  slug: string
}

const SERVICE_TAGS: Record<string, string[]> = {
  'stekloroll-ru': ['Прозрачные рольставни', 'Безрамное остекление', 'Монтаж', 'Доставка'],
  'artalico-ru': ['Роллетные шкафы', 'Прозрачные рольставни', 'Производство', 'Монтаж'],
  'levin-group-ru': ['Рольставни', 'Жалюзи', 'Ворота', 'Рулонные шторы'],
  'vorota-group-ru': ['Ворота', 'Рольставни', 'Шлагбаумы', 'Автоматика'],
  'alfa24-ru': ['Рольставни', 'Защитные рольставни', 'Ремонт', 'Монтаж'],
  'default': ['Рольставни', 'Монтаж', 'Доставка', 'Гарантия']
}

const EXCLUDED_SLUGS = [
  'dzen-ru', 'profi-ru', 'forumhouse-ru', 'lemanapro-ru', 'kinopoisk-ru',
  'uslugi-yandex-ru', 'yell-ru', 'zoon-ru', 't-me', 'ivd-ru', 'alutech-ru',
  'alutech-moscow', 'doorhan-ru', 'doorhan-moscow', 'grandline-ru',
  'alutech-group-com', 'alutech-proect-ru'
]

export default function HomePage({
  companies: initialCompanies,
  categories: initialCategories
}: {
  companies: Company[]
  categories: Category[]
}) {
  const [companies, setCompanies] = useState<Company[]>(initialCompanies)
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isLoading, setIsLoading] = useState(initialCompanies.length === 0)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('recommended')
  const [filterType, setFilterType] = useState('all')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [calcModalOpen, setCalcModalOpen] = useState(false)
  const [calcCompany, setCalcCompany] = useState('')

  // Клиентская загрузка данных
  useEffect(() => {
    if (initialCompanies.length === 0 && isLoading) {
      const fetchData = async () => {
        try {
          const [{ data: companiesData }, { data: categoriesData }] = await Promise.all([
            supabaseClient
              .from('companies')
              .select(`*, cities(name, slug), company_categories(categories(name, slug))`)
              .eq('status', 'active')
              .order('rating', { ascending: false }),
            supabaseClient
              .from('categories')
              .select('*')
              .eq('is_active', true)
              .order('sort_order')
          ])
          if (companiesData) setCompanies(companiesData)
          if (categoriesData) setCategories(categoriesData)
        } catch (e) {
          console.error('Fetch error:', e)
        } finally {
          setIsLoading(false)
        }
      }
      fetchData()
    }
  }, [initialCompanies.length, isLoading])

  const filteredCompanies = useMemo(() => {
    let result = [...companies]
    if (selectedCategory !== 'all') {
      result = result.filter(c =>
        c.company_categories?.some(cc => cc.categories?.slug === selectedCategory)
      )
    }
    if (filterType === 'manufacturers') {
      result = result.filter(c =>
        c.slug?.includes('stekloroll') || c.slug?.includes('artalico')
      )
    }
    result.sort((a, b) => {
      const aIsManuf = a.slug?.includes('stekloroll') || a.slug?.includes('artalico')
      const bIsManuf = b.slug?.includes('stekloroll') || b.slug?.includes('artalico')
      if (aIsManuf && !bIsManuf) return -1
      if (!aIsManuf && bIsManuf) return 1
      return (b.clicks || 0) - (a.clicks || 0)
    })
    return result.filter(c => !EXCLUDED_SLUGS.includes(c.slug))
  }, [companies, selectedCategory, filterType])

  const utmParams = 'utm_source=stroysales&utm_medium=referral&utm_campaign=catalog'

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 2.2L18.5 9H5.5L12 5.2zM6 19v-9h12v9H6z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">Строй<span className="text-orange-500">Сейлс</span></span>
          </a>
          <span className="text-sm text-gray-500 hidden sm:block">Каталог поставщиков</span>
        </div>
      </header>

      {/* Hero Banner SVG */}
      <div className="relative w-full">
        <img src="/hero-banner.svg" alt="" className="w-full h-auto" />
      </div>

      {/* Hero Text */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">Каталог проверенных поставщиков рольставней, ворот и остекления</h1>
          <p className="text-lg text-blue-100">800+ компаний по всей России с реальными отзывами и ценами</p>
        </div>
      </div>

      {/* Category Tiles - Avito style */}
      <div className="bg-white py-6 px-4">
        <div className="max-w-5xl mx-auto">
          {/* First row - 4 categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
            {[
              categories?.find(c => c.slug === 'prozrachnye-rolstavni'),
              categories?.find(c => c.slug === 'zashchitnye-rolstavni'),
              categories?.find(c => c.slug === 'vorota'),
              categories?.find(c => c.slug === 'bezramnoe-osteklenie'),
            ].filter(Boolean).map((cat) => {
              if (!cat) return null;
              const isActive = selectedCategory === cat.slug;
              
              const photos: Record<string, string> = {
                'prozrachnye-rolstavni': '/categories/prozrachnye.jpg',
                'zashchitnye-rolstavni': '/categories/zashchitnye.jpg',
                'bezramnoe-osteklenie': '/categories/bezramnoe.jpg',
                'vorota': '/categories/vorota.png',
                'myagkie-okna': '/categories/myagkie.jpg',
                'rolletnye-shkafy': '/categories/rolletnye.jpg',
                'ofisnye-peregorodki': '/categories/ofisnye.jpg',
              };
              const photo = photos[cat.slug] || '/categories/default.jpg';
              
              return (
                <a
                  key={cat.id}
                  href={`/${cat.slug}/`}
                  onClick={(e) => { e.preventDefault(); setSelectedCategory(cat.slug); }}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isActive ? 'ring-2 ring-orange-400 ring-offset-2' : ''
                  }`}
                >
                  <div className="relative w-full aspect-square">
                    <img src={photo} alt={cat.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isActive ? 'from-orange-600/90 to-orange-400/40' : 'from-black/70 via-black/30 to-transparent'
                    }`} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-xs font-semibold text-center leading-tight block text-white">{cat.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
          
          {/* Second row - 3 categories */}
          <div className="grid grid-cols-3 gap-3 max-w-3xl mx-auto mt-3">
            {[
              categories?.find(c => c.slug === 'myagkie-okna'),
              categories?.find(c => c.slug === 'rolletnye-shkafy'),
              categories?.find(c => c.slug === 'ofisnye-peregorodki'),
            ].filter(Boolean).map((cat) => {
              if (!cat) return null;
              const isActive = selectedCategory === cat.slug;
              
              const photos: Record<string, string> = {
                'myagkie-okna': '/categories/myagkie.jpg',
                'rolletnye-shkafy': '/categories/rolletnye.jpg',
                'ofisnye-peregorodki': '/categories/ofisnye.jpg',
              };
              const photo = photos[cat.slug] || '/categories/default.jpg';
              
              return (
                <a
                  key={cat.id}
                  href={`/${cat.slug}/`}
                  onClick={(e) => { e.preventDefault(); setSelectedCategory(cat.slug); }}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                    isActive ? 'ring-2 ring-orange-400 ring-offset-2' : ''
                  }`}
                >
                  <div className="relative w-full aspect-square">
                    <img src={photo} alt={cat.name} className="w-full h-full object-cover" />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isActive ? 'from-orange-600/90 to-orange-400/40' : 'from-black/70 via-black/30 to-transparent'
                    }`} />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <span className="text-xs font-semibold text-center leading-tight block text-white">{cat.name}</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm sticky top-14 z-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 p-3 bg-white border border-gray-300 rounded-lg text-sm"
            >
              <option value="all">Все услуги</option>
              {categories.map(c => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
            <button className="md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition">Найти</button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Загрузка компаний...</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-gray-600">
                Найдено <span className="font-semibold text-gray-900">{filteredCompanies.length} компаний</span>
              </div>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="text-sm border rounded-md px-2 py-1">
                <option value="recommended">Рекомендуемые</option>
              </select>
            </div>

            {/* Companies List */}
            <div className="space-y-3">
              {filteredCompanies.map(company => {
                const isManufacturer = company.slug?.includes('stekloroll') || company.slug?.includes('artalico')
                const website = company.website?.startsWith('http') ? company.website : `https://${company.website}`
                return (
                  <div key={company.id} className="bg-white rounded-lg shadow-sm p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                            {company.name?.charAt(0) || '?'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{company.name}</h3>
                            {company.address && <p className="text-sm text-gray-500">{company.address}</p>}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {(SERVICE_TAGS[company.slug] || SERVICE_TAGS['default']).map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="md:w-44 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4 space-y-2">
                        {isManufacturer ? (
                          <button
                            onClick={() => { setCalcCompany(company.name); setCalcModalOpen(true) }}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded transition"
                          >
                            Рассчитать цену
                          </button>
                        ) : (
                          <a href={`${website}?${utmParams}`} className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2 rounded transition">На сайт</a>
                        )}
                        {company.phone && <a href={`tel:${company.phone}`} className="block w-full text-center py-2 text-sm text-gray-600 hover:text-orange-500 border rounded transition">Позвонить</a>}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      <CalculatorModal isOpen={calcModalOpen} onClose={() => setCalcModalOpen(false)} companyName={calcCompany} />
    </div>
  )
}