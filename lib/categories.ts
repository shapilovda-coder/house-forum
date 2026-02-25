// lib/categories.ts — Human-readable category names

export const CATEGORY_NAMES: Record<string, string> = {
  'prozrachnye-rolstavni': 'Прозрачные рольставни',
  'zashitnye-rolstavni': 'Защитные рольставни',
  'rolletnye-shkafy': 'Роллетные шкафы',
  'bezramnoe-osteklenie': 'Безрамное остекление',
  'ofisnye-peregorodki': 'Офисные перегородки',
  'vorota': 'Ворота',
  'myagkie-okna': 'Мягкие окна',
}

export const REGION_NAMES: Record<string, string> = {
  'moskva-i-mo': 'Москва и МО',
  'spb-lo': 'СПб и ЛО',
}

export function getCategoryName(slug: string): string {
  return CATEGORY_NAMES[slug] || slug
}

export function getRegionName(slug: string): string {
  return REGION_NAMES[slug] || slug
}
