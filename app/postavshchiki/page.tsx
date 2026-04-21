import { Metadata } from 'next'
import AllSuppliersPage from '../components/AllSuppliersPage'
import { getCategoryName, getRegionName } from '@/lib/categories'
import { loadPublishedSuppliers, SupplierProfile } from '@/lib/suppliers'

// Load ALL suppliers from whitelist files ONLY
function loadAllSuppliers(): {
  suppliers: ReturnType<typeof loadPublishedSuppliers>
  categories: { slug: string; name: string }[]
  regions: { slug: string; name: string }[]
} {
  const suppliers = loadPublishedSuppliers()
  const categoriesSet = new Set<string>()
  const regionsSet = new Set<string>()

  suppliers.forEach((supplier) => {
    supplier.categories.forEach((category) => categoriesSet.add(category))
    supplier.regions.forEach((region) => regionsSet.add(region))
  })
  
  // Build categories list from actual data
  const categories = Array.from(categoriesSet)
    .sort()
    .map(slug => ({ slug, name: getCategoryName(slug) }))
  
  // Build regions list from actual data
  const regions = Array.from(regionsSet)
    .sort()
    .map(slug => ({ slug, name: getRegionName(slug) }))
  
  return { suppliers, categories, regions }
}

// Get pinned suppliers that should always show
function getPinnedSuppliers(allSuppliers: ReturnType<typeof loadPublishedSuppliers>) {
  const pinnedDomains = ['stekloroll.ru', 'artalico.ru']
  const pinned: SupplierProfile[] = []
  
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
        isPinned: true,
        id: domain,
        profileSlug: domain.replace(/\./g, '-'),
        updatedAt: new Date().toISOString(),
      })
    }
  }
  
  return pinned
}

export const metadata: Metadata = {
  title: 'Все поставщики | СтройСейлс',
  description: 'Полный каталог поставщиков рольставней, ворот, остекления и смежных решений с переходом в карточки компаний.',
  alternates: {
    canonical: 'https://stroysales.ru/postavshchiki/',
  },
  openGraph: {
    title: 'Все поставщики | СтройСейлс',
    description: 'Полный каталог поставщиков рольставней, ворот, остекления и смежных решений.',
    url: 'https://stroysales.ru/postavshchiki/',
    type: 'website',
    siteName: 'СтройСейлс',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Все поставщики | СтройСейлс',
    description: 'Полный каталог поставщиков рольставней, ворот и остекления.',
  },
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
