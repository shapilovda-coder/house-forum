'use client'

import { useState, useMemo } from 'react'
import CalculatorModal from './CalculatorModal'

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

// Сервисы для тегов
const SERVICE_TAGS: Record<string, string[]> = {
  'stekloroll-ru': ['Прозрачные рольставни', 'Безрамное остекление', 'Монтаж', 'Доставка'],
  'artalico-ru': ['Роллетные шкафы', 'Прозрачные рольставни', 'Производство', 'Монтаж'],
  'levin-group-ru': ['Рольставни', 'Жалюзи', 'Ворота', 'Рулонные шторы'],
  'vorota-group-ru': ['Ворота', 'Рольставни', 'Шлагбаумы', 'Автоматика'],
  'alfa24-ru': ['Рольставни', 'Защитные рольставни', 'Ремонт', 'Монтаж'],
  'moskva-jaluzi-ru': ['Жалюзи', 'Рольставни', 'Ворота', 'Карнизы'],
  'mskroll-ru': ['Рольставни', 'Гаражные ворота', 'Шлагбаумы', 'Ремонт'],
  'default': ['Рольставни', 'Монтаж', 'Доставка', 'Гарантия']
}

export default function HomePage({
  companies,
  categories
}: {
  companies: Company[]
  categories: Category[]
}) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchCity, setSearchCity] = useState('Москва')
  const [sortBy, setSortBy] = useState('recommended')
  const [filterType, setFilterType] = useState('all')
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [calcModalOpen, setCalcModalOpen] = useState(false)
  const [calcCompany, setCalcCompany] = useState('')

  const utmParams = 'utm_source=stroysales&utm_medium=referral&utm_campaign=catalog'

  const getServiceTags = (slug: string): string[] => {
    return SERVICE_TAGS[slug] || SERVICE_TAGS['default']
  }

  // Группировка компаний по базовому домену (для поддоменов)
  const groupedCompanies = useMemo(() => {
    const groups: Record<string, Company[]> = {}
    
    companies.forEach(company => {
      // Определяем базовый домен
      let baseDomain = company.slug
      
      // Для vorota-group: город.vorota-group.ru → vorota-group-ru
      if (company.slug?.includes('vorota-group')) {
        baseDomain = 'vorota-group-ru'
      }
      // Для stylishblinds: город.stylishblinds.ru → stylishblinds-ru
      else if (company.slug?.includes('stylishblinds')) {
        baseDomain = 'stylishblinds-ru'
      }
      // Для automaticheskie-vorota: город.automaticheskie-vorota.ru → automaticheskie-vorota-ru
      else if (company.slug?.includes('automaticheskie-vorota')) {
        baseDomain = 'automaticheskie-vorota-ru'
      }
      // Для 77vorota: город.77vorota.ru → 77vorota-ru
      else if (company.slug?.includes('77vorota')) {
        baseDomain = '77vorota-ru'
      }
      // Для oblzabor: город.oblzabor.ru → oblzabor-ru
      else if (company.slug?.includes('oblzabor')) {
        baseDomain = 'oblzabor-ru'
      }
      // Для tentoptom/tentoptoru: город.tentoptom.ru → tentoptom-ru
      else if (company.slug?.includes('tentoptom') || company.slug?.includes('tentoptoru')) {
        baseDomain = 'tentoptom-ru'
      }
      // Для myagkie/mjagkie/miagkie okna: → myagkie-okna-ru
      else if (company.slug?.includes('myagkieokna') || company.slug?.includes('mjagkieokna') || company.slug?.includes('miagkieokna')) {
        baseDomain = 'myagkie-okna-ru'
      }
      // Для moskva-jaluzi: → moskva-jaluzi-ru
      else if (company.slug?.includes('moskva-jaluzi')) {
        baseDomain = 'moskva-jaluzi-ru'
      }
      // Для region-vorota: → region-vorota-ru
      else if (company.slug?.includes('region-vorota')) {
        baseDomain = 'region-vorota-ru'
      }
      // Для zabor-dlya-doma: → zabor-dlya-doma-ru
      else if (company.slug?.includes('zabor-dlya-doma')) {
        baseDomain = 'zabor-dlya-doma-ru'
      }
      // Для metaldveri: → metaldveri-ru
      else if (company.slug?.includes('metaldveri')) {
        baseDomain = 'metaldveri-ru'
      }
      
      if (!groups[baseDomain]) {
        groups[baseDomain] = []
      }
      groups[baseDomain].push(company)
    })
    
    // Создаем объединенные компании
    return Object.entries(groups).map(([baseSlug, groupCompanies]) => {
      if (groupCompanies.length === 1) {
        return groupCompanies[0]
      }
      
      // Берем основную компанию (с наибольшим количеством кликов или первую)
      const main = groupCompanies.sort((a, b) => (b.clicks || 0) - (a.clicks || 0))[0]
      
      // Собираем все города
      const allCities = groupCompanies
        .map(c => c.cities?.name)
        .filter(Boolean)
        .filter((v, i, a) => a.indexOf(v) === i) // unique
        .slice(0, 3) // max 3 города
      
      // Собираем все категории
      const allCategories = groupCompanies
        .flatMap(c => c.company_categories || [])
        .filter((v, i, a) => a.findIndex(t => t.categories?.slug === v.categories?.slug) === i) // unique
      
      return {
        ...main,
        cities: { 
          name: allCities.join(', ') || main.cities?.name || 'Москва', 
          slug: main.cities?.slug || 'moskva' 
        },
        company_categories: allCategories,
        _groupCount: groupCompanies.length // для отображения "ещё N городов"
      }
    })
  }, [companies])

  const filteredCompanies = useMemo(() => {
    let result = [...groupedCompanies]

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

    switch (sortBy) {
      case 'recommended':
      default:
        result.sort((a, b) => {
          // 1. StekloRoll и Artalico всегда первые
          const aIsManuf = a.slug?.includes('stekloroll') || a.slug?.includes('artalico')
          const bIsManuf = b.slug?.includes('stekloroll') || b.slug?.includes('artalico')
          if (aIsManuf && !bIsManuf) return -1
          if (!aIsManuf && bIsManuf) return 1
          
          // 2. Остальные по кликам (desc)
          const aClicks = a.clicks || 0
          const bClicks = b.clicks || 0
          if (aClicks !== bClicks) return bClicks - aClicks
          
          // 3. Если клики равны — по алфавиту
          return (a.name || '').localeCompare(b.name || '')
        })
    }

    return result
  }, [companies, selectedCategory, sortBy, filterType])

  // Filter out non-commercial organizations
  const filteredCommercialCompanies = useMemo(() => {
    const excludedSlugs = [
      'dzen-ru', 'profi-ru', 'forumhouse-ru', 'lemanapro-ru', 'kinopoisk-ru',
      'uslugi-yandex-ru', 'yell-ru', 'zoon-ru', 't-me', 'ivd-ru', 'alutech-ru',
      'alutech-moscow', 'doorhan-ru', 'doorhan-moscow', 'grandline-ru',
      'alutech-group-com', 'alutech-proect-ru'
    ]
    return filteredCompanies.filter(c => !excludedSlugs.includes(c.slug))
  }, [filteredCompanies])

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3L4 9v12h16V9l-8-6zm0 2.2L18.5 9H5.5L12 5.2zM6 19v-9h12v9H6z"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Строй<span className="text-orange-500">Сейлс</span>
            </span>
          </a>
          <span className="text-sm text-gray-500 hidden sm:block">
            Каталог поставщиков
          </span>
        </div>
      </header>

      {/* Hero Banner SVG - No text */}
      <div className="relative w-full">
        <img 
          src="/hero-banner.svg" 
          alt=""
          className="w-full h-auto"
        />
      </div>

      {/* H1 + H2 Text */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Каталог проверенных поставщиков рольставней, ворот и остекления
          </h1>
          <h2 className="text-lg md:text-xl text-blue-100 mb-8">
            800+ компаний по всей России с реальными отзывами и ценами
          </h2>

          {/* Category Tiles - Fixed order */}
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
                
                // Фото для каждой категории
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
                    className={`group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      isActive
                        ? 'ring-2 ring-orange-400 ring-offset-2'
                        : ''
                    }`}
                  >
                    {/* Фото */}
                    <div className="relative w-full aspect-square">
                      <img 
                        src={photo}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                      {/* Градиент поверх */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isActive 
                          ? 'from-orange-600/90 to-orange-400/40' 
                          : 'from-black/70 via-black/30 to-transparent'
                      }`} />
                    </div>
                    
                    {/* Текст поверх фото */}
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-xs font-semibold text-center leading-tight block text-white">
                        {cat.name}
                      </span>
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
                  'prozrachnye-rolstavni': '/categories/prozrachnye.jpg',
                  'zashchitnye-rolstavni': '/categories/zashchitnye.jpg',
                  'bezramnoe-osteklenie': '/categories/bezramnoe.jpg',
                  'vorota': '/categories/vorota.png',
                  'myagkie-okna': '/categories/myagkie.jpg',
                  'rolletnye-shkafy': '/categories/rolletne.jpg',
                  'ofisnye-peregorodki': '/categories/ofisnye.jpg',
                };
                const photo = photos[cat.slug] || '/categories/default.svg';
                
                return (
                  <a
                    key={cat.id}
                    href={`/${cat.slug}/`}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl overflow-hidden transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                      isActive
                        ? 'ring-2 ring-orange-400 ring-offset-2'
                        : ''
                    }`}
                  >
                    <div className="relative w-full aspect-square">
                      <img 
                        src={photo}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isActive 
                          ? 'from-orange-600/90 to-orange-400/40' 
                          : 'from-black/70 via-black/30 to-transparent'
                      }`} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <span className="text-xs font-semibold text-center leading-tight block text-white">
                        {cat.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Search Box - Sticky */}
      <div className="bg-white border-b border-gray-200 py-4 px-4 shadow-sm sticky top-14 z-40">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Все услуги</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Город"
                className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="md:w-48">
              <select className="w-full p-3 bg-white border border-gray-300 rounded-lg text-sm focus:border-blue-500 focus:outline-none">
                <option>В ближайшие дни</option>
                <option>В течение недели</option>
                <option>В течение месяца</option>
              </select>
            </div>

            <div className="md:w-auto">
              <button className="w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition shadow-md">
                Найти
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            Найдено <span className="font-semibold text-gray-900">{filteredCommercialCompanies?.length || 0} компаний</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Сортировка:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-300 rounded-md px-2 py-1 bg-white"
            >
              <option value="recommended">Рекомендуемые</option>
            </select>
          </div>
        </div>

        {/* Filters - Mobile Toggle */}
        <div className="mb-4">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="md:hidden w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm font-medium text-gray-700"
          >
            <span>Фильтры</span>
            <svg
              className={`w-5 h-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div className={`${isFiltersOpen ? 'block' : 'hidden'} md:block mt-2 md:mt-0`}>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {[
                { id: 'all', label: 'Все' },
                { id: 'manufacturers', label: 'Производители' },
                { id: 'verified', label: 'Проверенные' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFilterType(filter.id)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition ${
                    filterType === filter.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-500'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Companies List */}
        <div className="space-y-3">
          {filteredCommercialCompanies?.map((company) => {
            const isManufacturer = company.slug?.includes('stekloroll') || company.slug?.includes('artalico')
            const website = company.website || `https://${company.slug?.replace(/-/g, '.')}`
            const domain = company.slug?.replace(/-/g, '.') || 'example.ru'
            const serviceTags = getServiceTags(company.slug)

            return (
              <div
                key={company.id}
                className={`bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden ${
                  isManufacturer ? 'ring-2 ring-orange-500' : ''
                }`}
              >
                {isManufacturer && (
                  <div className="bg-orange-500 text-white text-xs font-semibold px-4 py-1">
                    🏭 ПРОИЗВОДИТЕЛЬ
                  </div>
                )}

                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Left: Domain + Phone + Tags */}
                    <div className="flex-1">
                      {/* Domain as Title */}
                      <div className="mb-2">
                        <a
                          href={`${website}?${utmParams}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-bold text-blue-600 hover:underline flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          {domain}
                        </a>
                      </div>

                      {/* Address / Cities */}
                      <div className="flex items-start gap-2 mb-2">
                        <svg className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm text-gray-600">
                          {company.cities?.name || 'Москва'}
                          {company._groupCount && company._groupCount > 1 && (
                            <span className="text-blue-600 ml-1">+{company._groupCount - 1} городов</span>
                          )}
                        </span>
                      </div>

                      {/* Street Address */}
                      {company.address && (
                        <div className="flex items-start gap-2 mb-3 ml-6">
                          <span className="text-sm text-gray-500 line-clamp-2">
                            {company.address}
                          </span>
                        </div>
                      )}

                      {/* Phone */}
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        {company.phone ? (
                          <a
                            href={`tel:${company.phone}`}
                            className="text-base font-semibold text-gray-900 hover:text-orange-500"
                          >
                            {company.phone}
                          </a>
                        ) : (
                          <span className="text-sm text-gray-400">Телефон не указан</span>
                        )}
                      </div>

                      {/* Service Tags at Bottom */}
                      <div className="flex flex-wrap gap-1.5">
                        {serviceTags.map((tag, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              i === 0
                                ? 'bg-orange-100 text-orange-700 font-medium'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right: CTA Only */}
                    <div className="md:w-44 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 pt-3 md:pt-0 md:pl-4">
                      <div className="space-y-2">
                        {isManufacturer ? (
                          <>
                            {/* Desktop: Open Modal */}
                            <button
                              onClick={() => {
                                setCalcCompany(company.name)
                                setCalcModalOpen(true)
                              }}
                              className="hidden md:block w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2.5 rounded-md transition"
                            >
                              Рассчитать цену
                            </button>
                            {/* Mobile: Go to Calculator Page */}
                            <a
                              href="/calculator"
                              className="md:hidden block w-full bg-orange-500 hover:bg-orange-600 text-white text-center font-semibold text-sm py-2.5 rounded-md transition"
                            >
                              Рассчитать цену
                            </a>
                          </>
                        ) : (
                          <a
                            href={`${website}?${utmParams}`}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold text-sm py-2.5 rounded-md transition"
                          >
                            На сайт
                          </a>
                        )}
                        
                        {company.phone && (
                          <a
                            href={`tel:${company.phone}`}
                            className="block w-full text-center py-2 text-sm text-gray-600 hover:text-orange-500 border border-gray-200 rounded-md hover:border-orange-300 transition"
                          >
                            Позвонить
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Calculator Modal */}
      <CalculatorModal
        isOpen={calcModalOpen}
        onClose={() => setCalcModalOpen(false)}
        companyName={calcCompany}
      />
    </div>
  )
}
