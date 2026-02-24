// lib/seo/catalog.ts — единый источник категорий и регионов

export const CATEGORIES = [
  { 
    slug: 'prozrachnye-rolstavni', 
    name: 'Прозрачные рольставни',
    description: 'Прозрачные рольставни из поликарбоната для бизнеса и дома'
  },
  { 
    slug: 'zashchitnye-rolstavni', 
    name: 'Защитные рольставни',
    description: 'Защитные рольставни для магазинов и офисов'
  },
  { 
    slug: 'bezramnoe-osteklenie', 
    name: 'Безрамное остекление',
    description: 'Безрамное остекление веранд, террас и беседок'
  },
  { 
    slug: 'vorota', 
    name: 'Ворота',
    description: 'Автоматические и механические ворота'
  },
  { 
    slug: 'myagkie-okna', 
    name: 'Мягкие окна',
    description: 'Мягкие окна из ПВХ для веранд и беседок'
  },
  { 
    slug: 'rolletnye-shkafy', 
    name: 'Роллетные шкафы',
    description: 'Роллетные шкафы для парковок и подвалов'
  },
  { 
    slug: 'ofisnye-peregorodki', 
    name: 'Офисные перегородки',
    description: 'Офисные перегородки из стекла и алюминия'
  },
] as const;

export const REGIONS = [
  { slug: 'moskva-i-mo', name: 'Москва и Московская область' },
  { slug: 'sankt-peterburg', name: 'Санкт-Петербург' },
  { slug: 'novosibirskaya-oblast', name: 'Новосибирская область' },
  { slug: 'sverdlovskaya-oblast', name: 'Свердловская область' },
  { slug: 'tatarstan', name: 'Татарстан' },
  { slug: 'nizhegorodskaya-oblast', name: 'Нижегородская область' },
  { slug: 'krasnoyarskiy-kray', name: 'Красноярский край' },
  { slug: 'chelyabinskaya-oblast', name: 'Челябинская область' },
  { slug: 'samarskaya-oblast', name: 'Самарская область' },
  { slug: 'bashkortostan', name: 'Башкортостан' },
  { slug: 'rostovskaya-oblast', name: 'Ростовская область' },
  { slug: 'krasnodarskiy-kray', name: 'Краснодарский край' },
  { slug: 'omskaya-oblast', name: 'Омская область' },
  { slug: 'voronezhskaya-oblast', name: 'Воронежская область' },
  { slug: 'permskiy-kray', name: 'Пермский край' },
  { slug: 'volgogradskaya-oblast', name: 'Волгоградская область' },
] as const;

export type CategorySlug = typeof CATEGORIES[number]['slug'];
export type RegionSlug = typeof REGIONS[number]['slug'];

// Generate metadata for category page
export function getCategoryMetadata(slug: CategorySlug) {
  const cat = CATEGORIES.find(c => c.slug === slug);
  if (!cat) return null;
  
  return {
    title: `${cat.name} — поставщики, цены, установка | СтройСейлс`,
    description: `Каталог поставщиков ${cat.name.toLowerCase()}. Реальные отзывы, цены от производителей.`,
    h1: cat.name,
  };
}

// Generate metadata for category+region page
export function getCategoryRegionMetadata(categorySlug: CategorySlug, regionSlug: RegionSlug) {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  const region = REGIONS.find(r => r.slug === regionSlug);
  if (!cat || !region) return null;
  
  return {
    title: `${cat.name} в ${region.name} — цены, поставщики, отзывы | СтройСейлс`,
    description: `Найдите поставщиков ${cat.name.toLowerCase()} в ${region.name}. Реальные цены, отзывы, контакты.`,
    h1: `${cat.name} в ${region.name}`,
  };
}
