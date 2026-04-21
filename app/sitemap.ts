import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllBlogArticles } from '@/lib/blogArticles'
import { loadPublishedSuppliers } from '@/lib/suppliers'

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

  const blogArticles = getAllBlogArticles()

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

  const publishedWhitelistsDir = path.join(process.cwd(), 'data', 'published', 'whitelists')
  const publishedCategoryRegions = fs.existsSync(publishedWhitelistsDir)
    ? fs
        .readdirSync(publishedWhitelistsDir)
        .filter((file) => file.endsWith('.json') && !file.includes('_urls'))
        .map((file) => file.match(/^(.+)_(.+)\.json$/))
        .filter(Boolean)
        .map((match) => ({
          category: match![1],
          region: match![2],
        }))
    : []

  const publishedSuppliers = loadPublishedSuppliers()

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
      lastModified: new Date(article.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),

    // Category pages
    ...categories.map(cat => ({
      url: `${baseUrl}/${cat}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),

    // Category + Region pages
    ...publishedCategoryRegions.map(({ category, region }) => ({
      url: `${baseUrl}/${category}/${region}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),

    // Supplier profile pages
    ...publishedSuppliers.map((supplier) => ({
      url: `${baseUrl}/postavshchiki/${supplier.profileSlug}/`,
      lastModified: new Date(supplier.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    })),
  ]

  return sitemap
}
