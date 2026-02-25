// lib/pinnedConfig.ts — Unified pinned suppliers configuration
// Category + region → ordered list of pinned supplier domains

export type PinnedSupplier = {
  domain: string
  displayName: string
  phones: string[]
  address: string | null
  website: string
}

// Pinned suppliers data
const PINNED_DATA: Record<string, PinnedSupplier> = {
  stekloroll: {
    domain: 'stekloroll.ru',
    displayName: 'StekloRoll',
    phones: ['+74951510979'],
    address: 'Москва, Киевское шоссе, д.1, к.Б, БЦ Румянцево',
    website: 'https://stekloroll.ru',
  },
  artalico: {
    domain: 'artalico.ru',
    displayName: 'Artalico',
    phones: ['+74951510979'],
    address: null,
    website: 'https://artalico.ru',
  },
}

// Pinned configuration by category and region
// null = pinned for all regions of this category
export const PINNED_CONFIG: Record<string, string[] | Record<string, string[]>> = {
  // Prozrachnye: both pinned
  'prozrachnye-rolstavni': {
    'moskva-i-mo': ['stekloroll', 'artalico'],
  },
  // Bezramnoe: both pinned
  'bezramnoe-osteklenie': {
    'moskva-i-mo': ['stekloroll', 'artalico'],
  },
  // Myagkie okna: both as advertisement
  'myagkie-okna': {
    'moskva-i-mo': ['stekloroll', 'artalico'],
  },
  // Vorota: only Stekloroll
  'vorota': {
    'moskva-i-mo': ['stekloroll'],
  },
  // Zashitnye: only Stekloroll
  'zashitnye-rolstavni': {
    'moskva-i-mo': ['stekloroll'],
  },
  // Rolletnye shkafy: only Stekloroll
  'rolletnye-shkafy': {
    'moskva-i-mo': ['stekloroll'],
  },
}

/**
 * Get pinned suppliers for category/region
 * Returns ordered list of pinned supplier keys
 */
export function getPinnedForCategory(
  category: string,
  region: string
): string[] {
  const config = PINNED_CONFIG[category]
  if (!config) return []
  
  // If it's a record by region
  if (typeof config === 'object' && !Array.isArray(config)) {
    return config[region] || []
  }
  
  // If it's an array (same for all regions)
  return Array.isArray(config) ? config : []
}

/**
 * Get full pinned supplier data
 */
export function getPinnedSupplierData(key: string): PinnedSupplier | null {
  return PINNED_DATA[key] || null
}

/**
 * Check if domain is pinned
 */
export function isPinnedDomain(domain: string, category: string, region: string): boolean {
  const pinned = getPinnedForCategory(category, region)
  return pinned.some(key => {
    const data = getPinnedSupplierData(key)
    return data?.domain === domain
  })
}

/**
 * Normalize domain for deduplication
 * - lower-case
 * - remove protocol, path, params
 * - remove "www."
 * - returns root domain
 */
function normalizeDomain(input: string): string {
  if (!input) return ''
  
  let domain = input.toLowerCase().trim()
  
  // Remove protocol
  domain = domain.replace(/^https?:\/\//, '')
  // Remove path and params
  domain = domain.split('/')[0]
  domain = domain.split('?')[0]
  domain = domain.split('#')[0]
  // Remove www.
  domain = domain.replace(/^www\./, '')
  
  return domain
}

/**
 * Get dedupe key for supplier
 */
function getDedupeKey(supplier: any): string {
  // Try domain fields first
  const domain = supplier.domain || supplier.display_domain || supplier.slug || supplier.website || ''
  return normalizeDomain(domain)
}

/**
 * Apply pinned suppliers to list with strict deduplication
 * - Pinned suppliers always first (in config order)
 * - Main list filtered to remove any pinned domains
 * - No duplicates guaranteed
 */
export function applyPinnedSuppliers(
  suppliers: any[],
  category: string,
  region: string
): any[] {
  const pinnedKeys = getPinnedForCategory(category, region)
  if (pinnedKeys.length === 0) return suppliers
  
  // Build pinned supplier objects
  const pinnedSuppliers: any[] = []
  const pinnedDedupeKeys = new Set<string>()
  
  for (const key of pinnedKeys) {
    const data = getPinnedSupplierData(key)
    if (!data) continue
    
    const dedupeKey = normalizeDomain(data.domain)
    pinnedDedupeKeys.add(dedupeKey)
    
    // Check if this pinned supplier exists in main list
    const existing = suppliers.find(s => {
      return getDedupeKey(s) === dedupeKey
    })
    
    if (existing) {
      // Use existing data but mark as pinned and prioritize
      pinnedSuppliers.push({
        ...existing,
        is_pinned: true,
        clicks: 100,
      })
    } else {
      // Create new pinned supplier
      pinnedSuppliers.push({
        id: data.website,
        slug: data.domain,
        name: data.displayName,
        website: data.website,
        domain_display: data.domain,
        phone: data.phones[0] || '',
        phones: data.phones,
        address: data.address,
        cities: [{ name: 'Москва', slug: null }],
        regions: [{ slug: region, name: 'Москва и Московская область' }],
        categories: [{ category: { slug: category, name: category } }],
        status: 'active',
        clicks: 100,
        is_verified: true,
        is_pinned: true,
      })
    }
  }
  
  // STRICT DEDUP: Filter main list to remove ALL pinned domains
  const filteredSuppliers = suppliers.filter(s => {
    const dedupeKey = getDedupeKey(s)
    return !pinnedDedupeKeys.has(dedupeKey)
  })
  
  // Combine: pinned (in order) + filtered main list
  return [...pinnedSuppliers, ...filteredSuppliers]
}
