// Schema.org JSON-LD components for SEO

interface OrganizationSchemaProps {
  name?: string
  url?: string
  logo?: string
}

export function OrganizationSchema({
  name = 'СтройСейлс',
  url = 'https://stroysales.ru',
  logo = 'https://stroysales.ru/logo.png',
}: OrganizationSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description: 'Каталог поставщиков рольставней, ворот и остекления',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-495-151-09-79',
      contactType: 'sales',
      areaServed: 'RU',
      availableLanguage: 'Russian',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface ArticleSchemaProps {
  title: string
  description: string
  url: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
}

export function ArticleSchema({
  title,
  description,
  url,
  image = 'https://stroysales.ru/og-image.jpg',
  datePublished,
  dateModified,
  author = 'СтройСейлс',
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image,
    url,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'СтройСейлс',
      logo: {
        '@type': 'ImageObject',
        url: 'https://stroysales.ru/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface BreadcrumbSchemaProps {
  items: { name: string; url?: string }[]
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url || undefined,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
