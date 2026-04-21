export function getSupplierProfileSlug(input: {
  profileSlug?: string
  slug?: string
  domain?: string
  displayDomain?: string
  website?: string
}) {
  const raw = input.profileSlug || input.slug || input.displayDomain || input.domain || input.website || ''

  const normalized = raw
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .split('?')[0]

  return normalized
    .replace(/[^a-z0-9а-яё.-]+/gi, '-')
    .replace(/[.]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}
