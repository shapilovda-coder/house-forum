import fs from 'fs'
import path from 'path'
import { getSupplierProfileSlug } from './supplierProfileSlug'

export interface SupplierProfile {
  id: string
  profileSlug: string
  domain: string
  displayDomain: string
  name: string
  phones: string[]
  address: string | null
  categories: string[]
  regions: string[]
  website: string
  isPinned: boolean
  updatedAt: string
}

function normalizeDomain(input: string): string {
  if (!input) return ''

  return input
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]
}

export function loadPublishedSuppliers(): SupplierProfile[] {
  const suppliersMap = new Map<string, SupplierProfile>()
  const whitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')

  if (!fs.existsSync(whitelistsDir)) {
    return []
  }

  const files = fs.readdirSync(whitelistsDir)

  for (const file of files) {
    if (!file.endsWith('.json') || file.includes('_urls')) continue

    const match = file.match(/^(.+)_(.+)\.json$/)
    if (!match) continue

    const [, category, region] = match
    const filePath = path.join(whitelistsDir, file)
    const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

    if (!Array.isArray(raw)) continue

    for (const item of raw) {
      const parseStatus = String(item.parse_status || 'partial').toLowerCase().trim()
      if (!['ok', 'partial'].includes(parseStatus)) continue

      const domain = normalizeDomain(item.domain || item.display_domain || item.url || item.source_url || '')
      if (!domain) continue

      const existing = suppliersMap.get(domain)
      const baseItem: SupplierProfile = existing || {
        id: domain,
        profileSlug: getSupplierProfileSlug({
          slug: item.slug,
          domain,
          displayDomain: item.display_domain,
          website: item.url || item.source_url,
        }),
        domain,
        displayDomain: item.display_domain || domain,
        name: item.company_name || item.name || item.display_domain || domain,
        phones: Array.isArray(item.phones) ? item.phones.filter(Boolean) : [],
        address: item.address || null,
        categories: [],
        regions: [],
        website: item.url || item.source_url || `https://${domain}`,
        isPinned: Boolean(item.is_pinned),
        updatedAt: new Date().toISOString(),
      }

      if (!baseItem.categories.includes(category)) {
        baseItem.categories.push(category)
      }

      if (!baseItem.regions.includes(region)) {
        baseItem.regions.push(region)
      }

      if (!baseItem.address && item.address) {
        baseItem.address = item.address
      }

      if (baseItem.phones.length === 0 && Array.isArray(item.phones)) {
        baseItem.phones = item.phones.filter(Boolean)
      }

      if (!baseItem.name || baseItem.name === baseItem.domain) {
        baseItem.name = item.company_name || item.name || item.display_domain || domain
      }

      baseItem.isPinned = baseItem.isPinned || Boolean(item.is_pinned)
      suppliersMap.set(domain, baseItem)
    }
  }

  return Array.from(suppliersMap.values()).sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1
    return a.displayDomain.localeCompare(b.displayDomain, 'ru')
  })
}

export function getPublishedSupplierBySlug(slug: string) {
  const normalizedSlug = slug.toLowerCase()

  return (
    loadPublishedSuppliers().find((supplier) => {
      const candidates = [
        supplier.profileSlug,
        supplier.domain,
        supplier.displayDomain,
      ].map((value) => getSupplierProfileSlug({ slug: value }))

      return candidates.includes(normalizedSlug)
    }) ?? null
  )
}
