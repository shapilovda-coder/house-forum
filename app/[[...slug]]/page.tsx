import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from './HomePage'
import CategoryPage from './CategoryPage'

// Конфигурация
const CATEGORIES = [
  { slug: 'prozrachnye-rolstavni', name: 'Прозрачные рольставни' },
  { slug: 'zashchitnye-rolstavni', name: 'Защитные рольставни' },
  { slug: 'bezramnoe-osteklenie', name: 'Безрамное остекление' },
  { slug: 'vorota', name: 'Ворота' },
  { slug: 'myagkie-okna', name: 'Мягкие окна' },
  { slug: 'rolletnye-shkafy', name: 'Роллетные шкафы' },
  { slug: 'ofisnye-peregorodki', name: 'Офисные перегородки' },
]

const CITIES = [
  { slug: 'moskva', name: 'Москва' },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург' },
  { slug: 'novosibirsk', name: 'Новосибирск' },
  { slug: 'ekaterinburg', name: 'Екатеринбург' },
  { slug: 'kazan', name: 'Казань' },
  { slug: 'nizhniy-novgorod', name: 'Нижний Новгород' },
  { slug: 'krasnoyarsk', name: 'Красноярск' },
  { slug: 'chelyabinsk', name: 'Челябинск' },
  { slug: 'samara', name: 'Самара' },
  { slug: 'ufa', name: 'Уфа' },
  { slug: 'rostov-na-donu', name: 'Ростов-на-Дону' },
  { slug: 'krasnodar', name: 'Краснодар' },
  { slug: 'omsk', name: 'Омск' },
  { slug: 'voronezh', name: 'Воронеж' },
  { slug: 'perm', name: 'Пермь' },
  { slug: 'volgograd', name: 'Волгоград' },
]

const STATIC_PAGES = ['blog', 'kontakty', 'calculator', 'o-projekte']

// Загрузка данных из JSON
function loadData() {
  try {
    const companies = require('../../data/backup/companies.json') || []
    const categories = require('../../data/backup/categories.json') || []
    const companyCategories = require('../../data/backup/company_categories.json') || []
    return { companies, categories, companyCategories }
  } catch (e) {
    console.error('Failed to load data:', e)
    return { companies: [], categories: [], companyCategories: [] }
  }
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = []
  
  // Главная страница
  paths.push({ slug: [] })
  
  // Статические страницы
  STATIC_PAGES.forEach(page => {
    paths.push({ slug: [page] })
  })
  
  // Категории
  CATEGORIES.forEach(cat => {
    paths.push({ slug: [cat.slug] })
  })
  
  // Категории + города
  CATEGORIES.forEach(cat => {
    CITIES.forEach(city => {
      paths.push({ slug: [cat.slug, city.slug] })
    })
  })
  
  return paths
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug?: string[] }> 
}): Promise<Metadata> {
  const { slug = [] } = await params
  
  // Главная
  if (slug.length === 0) {
    return {
      title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления в России',
      description: 'Найдите проверенных поставщиков рольставней, ворот, мягких окон и безрамного остекления в России. 400+ компаний, реальные отзывы, цены от производителей.',
    }
  }
  
  // Категория
  if (slug.length === 1) {
    const category = CATEGORIES.find(c => c.slug === slug[0])
    if (category) {
      return {
        title: `${category.name} — поставщики, цены, установка | СтройСейлс`,
        description: `Каталог поставщиков ${category.name.toLowerCase()}. Реальные отзывы, цены от производителей.`,
      }
    }
  }
  
  // Категория + город
  if (slug.length === 2) {
    const category = CATEGORIES.find(c => c.slug === slug[0])
    const city = CITIES.find(c => c.slug === slug[1])
    if (category && city) {
      return {
        title: `${category.name} в ${city.name} — цены, поставщики, отзывы | СтройСейлс`,
        description: `Найдите поставщиков ${category.name.toLowerCase()} в ${city.name}. Реальные цены, отзывы, контакты.`,
      }
    }
  }
  
  return {
    title: 'СтройСейлс — каталог поставщиков',
  }
}

export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug?: string[] }> 
}) {
  const { slug = [] } = await params
  const { companies, categories, companyCategories } = loadData()
  
  // Главная страница
  if (slug.length === 0) {
    return <HomePage 
      companies={companies} 
      categories={categories} 
    />
  }
  
  // Один сегмент
  if (slug.length === 1) {
    const segment = slug[0]
    
    // Статическая страница
    if (STATIC_PAGES.includes(segment)) {
      if (segment === 'blog') {
        return <div>Blog Page</div>
      }
      if (segment === 'kontakty') {
        return <div>Contacts Page</div>
      }
      if (segment === 'calculator') {
        return <div>Calculator Page</div>
      }
    }
    
    // Страница категории
    const category = CATEGORIES.find(c => c.slug === segment)
    if (category) {
      // Фильтруем компании по категории
      const categoryCompanyIds = companyCategories
        .filter((cc: any) => cc.category_id === categories.find((c: any) => c.slug === category.slug)?.id)
        .map((cc: any) => cc.company_id)
      
      const filteredCompanies = companies.filter((c: any) => 
        categoryCompanyIds.includes(c.id) && c.status === 'active'
      )
      
      // Сортировка: StekloRoll, Artalico, затем по кликам
      const sortedCompanies = filteredCompanies.sort((a: any, b: any) => {
        if (a.slug?.includes('stekloroll')) return -1
        if (b.slug?.includes('stekloroll')) return 1
        if (a.slug?.includes('artalico')) return -1
        if (b.slug?.includes('artalico')) return 1
        return (b.clicks || 0) - (a.clicks || 0)
      })
      
      return <CategoryPage
        category={category}
        companies={sortedCompanies}
        categories={categories}
      />
    }
  }
  
  // Два сегмента: категория + город
  if (slug.length === 2) {
    const [catSlug, citySlug] = slug
    const category = CATEGORIES.find(c => c.slug === catSlug)
    const city = CITIES.find(c => c.slug === citySlug)
    
    if (category && city) {
      // TODO: Фильтрация по городу
      const categoryCompanyIds = companyCategories
        .filter((cc: any) => cc.category_id === categories.find((c: any) => c.slug === category.slug)?.id)
        .map((cc: any) => cc.company_id)
      
      const filteredCompanies = companies.filter((c: any) => 
        categoryCompanyIds.includes(c.id) && c.status === 'active'
      )
      
      const sortedCompanies = filteredCompanies.sort((a: any, b: any) => {
        if (a.slug?.includes('stekloroll')) return -1
        if (b.slug?.includes('stekloroll')) return 1
        if (a.slug?.includes('artalico')) return -1
        if (b.slug?.includes('artalico')) return 1
        return (b.clicks || 0) - (a.clicks || 0)
      })
      
      return <CategoryPage
        category={category}
        city={city}
        companies={sortedCompanies}
        categories={categories}
      />
    }
  }
  
  // Не найдено
  notFound()
}
