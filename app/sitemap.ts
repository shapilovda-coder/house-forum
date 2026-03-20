import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://stroysales.ru'
  
  // Static pages
  const staticPages = [
    { url: '/', changefreq: 'daily', priority: 1 },
    { url: '/blog/', changefreq: 'daily', priority: 0.9 },
    { url: '/postavshchiki/', changefreq: 'weekly', priority: 0.8 },
    { url: '/calculator/', changefreq: 'monthly', priority: 0.7 },
    { url: '/kontakty/', changefreq: 'monthly', priority: 0.6 },
  ] as const

  // Blog articles
  const blogArticles = [
    { slug: 'prozrachnye-rolstavni-dlya-verandy', priority: 0.8 },
    { slug: 'zashitnye-rolstavni-dlya-dachi', priority: 0.8 },
    { slug: 'sektsionnye-vorota-garazh', priority: 0.8 },
    { slug: 'kak-vybrat-prozrachnye-rolstavni', priority: 0.7 },
  ]

  // Categories with regions
  const categories = [
    'prozrachnye-rolstavni',
    'zashitnye-rolstavni',
    'bezramnoe-osteklenie',
    'vorota',
    'myagkie-okna',
    'rolletnye-shkafy',
    'ofisnye-peregorodki',
  ]

  const regions = ['moskva-i-mo', 'sankt-peterburg-i-lo']

  const sitemap: MetadataRoute.Sitemap = [
    // Static pages
    ...staticPages.map(page => ({
      url: `${baseUrl}${page.url}`,
      lastModified: new Date(),
      changeFrequency: page.changefreq as 'daily' | 'weekly' | 'monthly',
      priority: page.priority,
    })),

    // Blog articles
    ...blogArticles.map(article => ({
      url: `${baseUrl}/blog/${article.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: article.priority,
    })),

    // Category pages
    ...categories.map(cat => ({
      url: `${baseUrl}/${cat}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Category + Region pages
    ...categories.flatMap(cat =>
      regions.map(region => ({
        url: `${baseUrl}/${cat}/${region}/`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    ),
  ]

  return sitemap
}
