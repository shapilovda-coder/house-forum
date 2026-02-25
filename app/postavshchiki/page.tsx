import { Metadata } from 'next'
import AllSuppliersPage from '../components/AllSuppliersPage'
import fs from 'fs'
import path from 'path'

// Load all suppliers from whitelists
function loadAllSuppliers() {
  const suppliers: any[] = []
  const whitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')
  
  if (!fs.existsSync(whitelistsDir)) {
    return { suppliers: [], categories: [], regions: [] }
  }

  const files = fs.readdirSync(whitelistsDir)
  const seenDomains = new Set<string>()

  for (const file of files) {
    if (!file.endsWith('.json') || file.includes('_urls')) continue
    
    const match = file.match(/^(.+)_(.+)\.json$/)
    if (!match) continue
    
    const [, category, region] = match
    const filePath = path.join(whitelistsDir, file)
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    
    if (!Array.isArray(data)) continue

    for (const item of data) {
      const domain = item.domain || item.display_domain || item.slug || ''
      const normDomain = domain.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
      
      // Skip duplicates by normalized domain
      if (seenDomains.has(normDomain)) continue
      seenDomains.add(normDomain)
      
      suppliers.push({
        domain: domain,
        displayDomain: item.display_domain || domain,
        name: item.company_name || item.name || domain,
        phones: item.phones || [],
        address: item.address || null,
        categories: [category],
        regions: [region === 'moskva-i-mo' ? 'Москва и МО' : region === 'spb-lo' ? 'СПб и ЛО' : region],
        website: item.url || item.source_url || `https://${domain}`,
        isPinned: item.is_pinned || false
      })
    }
  }

  // Extract unique categories and regions
  const categories = Array.from(new Set(suppliers.flatMap(s => s.categories)))
    .map(slug => ({
      slug,
      name: getCategoryName(slug)
    }))

  const regions = Array.from(new Set(suppliers.flatMap(s => s.regions)))
    .map(slug => ({
      slug: slug === 'Москва и МО' ? 'moskva-i-mo' : slug === 'СПб и ЛО' ? 'spb-lo' : slug,
      name: slug
    }))

  return { suppliers, categories, regions }
}

function getCategoryName(slug: string): string {
  const names: Record<string, string> = {
    'prozrachnye-rolstavni': 'Прозрачные рольставни',
    'zashitnye-rolstavni': 'Защитные рольставни',
    'bezramnoe-osteklenie': 'Безрамное остекление',
    'myagkie-okna': 'Мягкие окна',
    'rolletnye-shkafy': 'Роллетные шкафы',
    'vorota': 'Ворота',
    'ofisnye-peregorodki': 'Офисные перегородки'
  }
  return names[slug] || slug
}

export const metadata: Metadata = {
  title: 'Все поставщики | СтройСейлс',
  description: 'Полный каталог поставщиков рольставней, ворот, остекления'
}

export default function Page() {
  const { suppliers, categories, regions } = loadAllSuppliers()
  
  return (
    <AllSuppliersPage 
      suppliers={suppliers} 
      categories={categories}
      regions={regions}
    />
  )
}
