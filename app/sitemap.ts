import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://stroysales.ru/',
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://stroysales.ru/blog/',
      lastModified: new Date('2026-03-19'),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'https://stroysales.ru/blog/prozrachnye-rolstavni-dlya-verandy/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://stroysales.ru/blog/zashitnye-rolstavni-dlya-dachi/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://stroysales.ru/blog/sektsionnye-vorota-garazh/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://stroysales.ru/category/prozrachnye-rolstavni/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://stroysales.ru/category/zashitnye-rolstavni/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'https://stroysales.ru/category/vorota/',
      lastModified: new Date('2026-03-17'),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}
