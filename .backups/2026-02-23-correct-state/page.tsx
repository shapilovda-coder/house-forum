import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import HomePage from './HomePage'
import CategoryPage from './CategoryPage'
import { createClient } from '@supabase/supabase-js'

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

const STATIC_PAGES = ['blog', 'kontakty', 'calculator', 'o-proekte']

// Supabase client
const supabase = createClient(
  'https://zzellrqkamskeftyprkv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZWxscnFrYW1za2VmdHlwcmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDMyOTIsImV4cCI6MjA4NzI3OTI5Mn0.vNrzaaOWG2cDBCDcrQISN_R2PgKb0XekNTQAndLhNy8'
)

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
  
  // Главная страница
  if (slug.length === 0) {
    let companies = []
    let categories = []
    
    try {
      const { data: companiesData, error: companiesError } = await supabase
        .from('companies')
        .select(`
          *,
          cities(name, slug),
          company_categories(
            categories(name, slug)
          )
        `)
        .eq('status', 'active')
        .order('rating', { ascending: false })
      
      if (companiesError) {
        console.error('Supabase companies error:', companiesError)
      } else {
        companies = companiesData || []
      }
      
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      if (categoriesError) {
        console.error('Supabase categories error:', categoriesError)
      } else {
        categories = categoriesData || []
      }
    } catch (e) {
      console.error('Supabase fetch error:', e)
    }
    
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
      // Редирект на существующие страницы
      if (segment === 'blog') {
        return <div>Blog Page</div> // Или импорт существующей страницы
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
      const { data: companies } = await supabase
        .from('companies')
        .select(`
          *,
          cities(name, slug),
          company_categories!inner(
            categories(name, slug)
          )
        `)
        .eq('status', 'active')
        .eq('company_categories.categories.slug', category.slug)
        .order('clicks', { ascending: false })
      
      const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      return <CategoryPage
        category={category}
        companies={companies || []}
        categories={categories || []}
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
      const { data: companies } = await supabase
        .from('companies')
        .select(`
          *,
          cities(name, slug),
          company_categories!inner(
            categories(name, slug)
          )
        `)
        .eq('status', 'active')
        .eq('company_categories.categories.slug', category.slug)
        .order('clicks', { ascending: false })
      
      const { data: categories } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order')
      
      return <CategoryPage
        category={category}
        city={city}
        companies={companies || []}
        categories={categories || []}
      />
    }
  }
  
  // Не найдено
  notFound()
}
