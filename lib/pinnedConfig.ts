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
 * Apply pinned suppliers to list
 * - Adds pinned suppliers not present in list
 * - Reorders: pinned first (in config order), then rest
 * - No duplicates
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
  const existingDomains = new Set(suppliers.map(s => 
    (s.domain || s.display_domain || s.slug || '').toLowerCase()
  ))
  
  for (const key of pinnedKeys) {
    const data = getPinnedSupplierData(key)
    if (!data) continue
    
    const domainLower = data.domain.toLowerCase()
    
    // Check if already in list
    if (existingDomains.has(domainLower)) {
      // Will be reordered, don't add duplicate
      continue
    }
    
    // Add pinned supplier
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
      clicks: 100, // High priority
      is_verified: true,
      is_pinned: true,
    })
  }
  
  // Filter out existing pinned from suppliers (will re-add in correct order)
  const nonPinned = suppliers.filter(s => {
    const domain = (s.domain || s.display_domain || s.slug || '').toLowerCase()
    return !pinnedKeys.some(key => {
      const pinnedData = getPinnedSupplierData(key)
      return pinnedData?.domain.toLowerCase() === domain
    })
  })
  
  // Re-add existing pinned in correct order
  const existingPinned: any[] = []
  for (const key of pinnedKeys) {
    const data = getPinnedSupplierData(key)
    if (!data) continue
    
    const existing = suppliers.find(s => {
      const domain = (s.domain || s.display_domain || s.slug || '').toLowerCase()
      return domain === data.domain.toLowerCase()
    })
    
    if (existing) {
      existingPinned.push({
        ...existing,
        is_pinned: true,
        clicks: 100,
      })
    }
  }
  
  // Combine: existing pinned (in order) + new pinned + rest
  return [...existingPinned, ...pinnedSuppliers, ...nonPinned]
}
