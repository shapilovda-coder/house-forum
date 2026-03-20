import { Metadata } from 'next'
import AllSuppliersPage from '../components/AllSuppliersPage'
import fs from 'fs'
import path from 'path'
import { getCategoryName, getRegionName } from '@/lib/categories'

interface Supplier {
  domain: string
  displayDomain: string
  name: string
  phones: string[]
  address: string | null
  categories: string[]
  regions: string[]
  website: string
  isPinned: boolean
}

// Normalize domain for deduplication
function normalizeDomain(input: string): string {
  if (!input) return ''
  let domain = input.toLowerCase().trim()
  domain = domain.replace(/^https?:\/\//, '')
  domain = domain.split('/')[0]
  domain = domain.split('?')[0]
  domain = domain.replace(/^www\./, '')
  return domain
}

// Load ALL suppliers from whitelist files ONLY
function loadAllSuppliers(): {
  suppliers: Supplier[]
  categories: { slug: string; name: string }[]
  regions: { slug: string; name: string }[]
} {
  const suppliersMap = new Map<string, Supplier>()
  const categoriesSet = new Set<string>()
  const regionsSet = new Set<string>()
  
  const whitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')
  
  if (!fs.existsSync(whitelistsDir)) {
    return { suppliers: [], categories: [], regions: [] }
  }

  const files = fs.readdirSync(whitelistsDir)
  
  for (const file of files) {
    if (!file.endsWith('.json') || file.includes('_urls')) continue
    
    const match = file.match(/^(.+)_(.+)\.json$/)
    if (!match) continue
    
    const [, category, region] = match
    categoriesSet.add(category)
    regionsSet.add(region)
    
    const filePath = path.join(whitelistsDir, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    if (!Array.isArray(data)) continue

    for (const item of data) {
      const domain = item.domain || item.display_domain || item.slug || ''
      const normDomain = normalizeDomain(domain)
      
      if (!normDomain) continue
      
      if (suppliersMap.has(normDomain)) {
        // Merge categories
        const existing = suppliersMap.get(normDomain)!
        if (!existing.categories.includes(category)) {
          existing.categories.push(category)
        }
        if (!existing.regions.includes(region)) {
          existing.regions.push(region)
        }
      } else {
        suppliersMap.set(normDomain, {
          domain: normDomain,
          displayDomain: item.display_domain || domain,
          name: item.company_name || item.name || domain,
          phones: item.phones || [],
          address: item.address || null,
          categories: [category],
          regions: [region],
          website: item.url || item.source_url || `https://${normDomain}`,
          isPinned: item.is_pinned || false
        })
      }
    }
  }
  
  // Build categories list from actual data
  const categories = Array.from(categoriesSet)
    .sort()
    .map(slug => ({ slug, name: getCategoryName(slug) }))
  
  // Build regions list from actual data
  const regions = Array.from(regionsSet)
    .sort()
    .map(slug => ({ slug, name: getRegionName(slug) }))
  
  // Convert map to array
  const suppliers = Array.from(suppliersMap.values())
  
  return { suppliers, categories, regions }
}

// Get pinned suppliers that should always show
function getPinnedSuppliers(allSuppliers: Supplier[]): Supplier[] {
  const pinnedDomains = ['stekloroll.ru', 'artalico.ru']
  const pinned: Supplier[] = []
  
  for (const domain of pinnedDomains) {
    const found = allSuppliers.find(s => s.domain === domain)
    if (found) {
      pinned.push({ ...found, isPinned: true })
    } else {
      // Create pinned supplier if not in whitelist
      pinned.push({
        domain: domain,
        displayDomain: domain,
        name: domain === 'stekloroll.ru' ? 'StekloRoll' : 'Artalico',
        phones: ['+74951510979'],
        address: domain === 'stekloroll.ru' ? 'Москва, Киевское шоссе, д.1, к.Б, БЦ Румянцево' : null,
        categories: ['prozrachnye-rolstavni', 'bezramnoe-osteklenie', 'ofisnye-peregorodki', 'myagkie-okna'],
        regions: ['moskva-i-mo'],
        website: `https://${domain}`,
        isPinned: true
      })
    }
  }
  
  return pinned
}

export const metadata: Metadata = {
  title: 'Все поставщики | СтройСейлс',
  description: 'Полный каталог поставщиков рольставней, ворот, остекления'
}

export default function Page() {
  const { suppliers, categories, regions } = loadAllSuppliers()
  
  // Get pinned suppliers
  const pinnedSuppliers = getPinnedSuppliers(suppliers)
  
  // Filter out pinned from main list (to avoid duplicates)
  const pinnedDomains = new Set(pinnedSuppliers.map(p => p.domain))
  const regularSuppliers = suppliers
    .filter(s => !pinnedDomains.has(s.domain))
    .sort((a, b) => a.domain.localeCompare(b.domain))
  
  // Combine: pinned first, then alphabetically sorted regular
  const finalSuppliers = [...pinnedSuppliers, ...regularSuppliers]
  
  return (
    <AllSuppliersPage 
      suppliers={finalSuppliers} 
      categories={categories}
      regions={regions}
    />
  )
}
