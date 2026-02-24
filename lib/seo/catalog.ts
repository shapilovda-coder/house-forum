// lib/seo/catalog.ts — единый источник категорий

import { CANONICAL_REGIONS, normalizeRegion, getCanonicalRegion } from './regions';

export { CANONICAL_REGIONS, normalizeRegion, getCanonicalRegion };

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

export type CategorySlug = typeof CATEGORIES[number]['slug'];

// Re-export region types
export type { Region } from './regions';

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
export function getCategoryRegionMetadata(categorySlug: CategorySlug, regionSlug: string) {
  const cat = CATEGORIES.find(c => c.slug === categorySlug);
  const region = getCanonicalRegion(regionSlug);
  
  if (!cat || !region) return null;
  
  return {
    title: `${cat.name} в ${region.name} — цены, поставщики, отзывы | СтройСейлс`,
    description: `Найдите поставщиков ${cat.name.toLowerCase()} в ${region.name}. Реальные цены, отзывы, контакты.`,
    h1: `${cat.name} в ${region.name}`,
  };
}
