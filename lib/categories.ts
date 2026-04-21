// lib/categories.ts — Human-readable category names and images

export const CATEGORY_NAMES: Record<string, string> = {
  'prozrachnye-rolstavni': 'Прозрачные рольставни',
  'zashitnye-rolstavni': 'Защитные рольставни',
  'rolletnye-shkafy': 'Роллетные шкафы',
  'bezramnoe-osteklenie': 'Безрамное остекление',
  'ofisnye-peregorodki': 'Офисные перегородки',
  'vorota': 'Ворота',
  'myagkie-okna': 'Мягкие окна',
}

export const CATEGORY_IMAGES: Record<string, string> = {
  'prozrachnye-rolstavni': '/categories/prozrachnye.webp',
  'zashitnye-rolstavni': '/categories/zashchitnye.webp',
  'rolletnye-shkafy': '/categories/rolletnye.webp',
  'bezramnoe-osteklenie': '/categories/bezramnoe.webp',
  'ofisnye-peregorodki': '/categories/ofisnye.webp',
  'vorota': '/categories/vorota.webp',
  'myagkie-okna': '/categories/myagkie.webp',
}

export const REGION_NAMES: Record<string, string> = {
  'moskva-i-mo': 'Москва и МО',
  'spb-lo': 'СПб и ЛО',
}

export function getCategoryName(slug: string): string {
  return CATEGORY_NAMES[slug] || slug
}

export function getCategoryImage(slug: string): string | null {
  return CATEGORY_IMAGES[slug] || null
}

export function getRegionName(slug: string): string {
  return REGION_NAMES[slug] || slug
}
