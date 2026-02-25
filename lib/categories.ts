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
  'prozrachnye-rolstavni': '/categories/prozrachnye.jpg',
  'zashitnye-rolstavni': '/categories/zashchitnye.jpg',
  'rolletnye-shkafy': '/categories/rolletnye.jpg',
  'bezramnoe-osteklenie': '/categories/bezramnoe.jpg',
  'ofisnye-peregorodki': '/categories/ofisnye.jpg',
  'vorota': '/categories/vorota.png',
  'myagkie-okna': '/categories/myagkie.jpg',
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
