// lib/seo/regions.ts — канонические регионы и нормализация

export interface Region {
  slug: string
  name: string
  namePrepositional: string
  aliases: string[]
}

/**
 * REGION_MAP — нормализует любые варианты написания регионов
 * из Supabase в канонические slug
 */
export const REGION_MAP: Record<string, string> = {
  // → moskva-i-mo
  'Москва': 'moskva-i-mo',
  'Московская область': 'moskva-i-mo',
  'МО': 'moskva-i-mo',
  'Москва и МО': 'moskva-i-mo',
  'Moscow': 'moskva-i-mo',
  'Moscow Region': 'moskva-i-mo',
  
  // → spb-lo
  'Санкт-Петербург': 'spb-lo',
  'СПб': 'spb-lo',
  'Питер': 'spb-lo',
  'Ленобласть': 'spb-lo',
  'Ленинградская область': 'spb-lo',
  'СПб и ЛО': 'spb-lo',
  'Saint Petersburg': 'spb-lo',
  'Leningrad Oblast': 'spb-lo',
  
  // Другие регионы (пока не используются, но готовы)
  'Новосибирская область': 'novosibirskaya-oblast',
  'Свердловская область': 'sverdlovskaya-oblast',
  'Татарстан': 'tatarstan',
  'Нижегородская область': 'nizhegorodskaya-oblast',
  'Красноярский край': 'krasnoyarskiy-kray',
  'Челябинская область': 'chelyabinskaya-oblast',
  'Самарская область': 'samarskaya-oblast',
  'Башкортостан': 'bashkortostan',
  'Ростовская область': 'rostovskaya-oblast',
  'Краснодарский край': 'krasnodarskiy-kray',
  'Омская область': 'omskaya-oblast',
  'Воронежская область': 'voronezhskaya-oblast',
  'Пермский край': 'permskiy-kray',
  'Волгоградская область': 'volgogradskaya-oblast',
}

/**
 * Канонические регионы для SEO-страниц
 */
export const CANONICAL_REGIONS: Region[] = [
  {
    slug: 'moskva-i-mo',
    name: 'Москва и Московская область',
    namePrepositional: 'Москве и Московской области',
    aliases: ['Москва', 'Московская область', 'МО', 'Moscow']
  },
  {
    slug: 'spb-lo',
    name: 'Санкт-Петербург и Ленинградская область',
    namePrepositional: 'Санкт-Петербурге и Ленинградской области',
    aliases: ['Санкт-Петербург', 'СПб', 'Питер', 'Ленобласть', 'Ленинградская область']
  }
]

/**
 * Нормализует raw регион из Supabase в канонический slug
 */
export function normalizeRegion(rawRegion: string | null): string | null {
  if (!rawRegion) return null
  return REGION_MAP[rawRegion] || null
}

/**
 * Проверяет, является ли регион каноническим (для которого есть SEO-страница)
 */
export function isCanonicalRegion(slug: string): boolean {
  return CANONICAL_REGIONS.some(r => r.slug === slug)
}

/**
 * Получает канонический регион по slug
 */
export function getCanonicalRegion(slug: string): Region | null {
  return CANONICAL_REGIONS.find(r => r.slug === slug) || null
}

/**
 * В будущем: порог для создания city-страницы
 * City-страница создаётся только если поставщиков >= MIN_SUPPLIERS_FOR_CITY_PAGE
 */
export const MIN_SUPPLIERS_FOR_CITY_PAGE = 15

/**
 * Проверяет, достаточно ли поставщиков для city-страницы
 */
export function hasEnoughSuppliersForCityPage(supplierCount: number): boolean {
  return supplierCount >= MIN_SUPPLIERS_FOR_CITY_PAGE
}
