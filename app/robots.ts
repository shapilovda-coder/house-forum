import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/*?*'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '*.jpg', '*.png', '*.webp'],
      },
    ],
    sitemap: 'https://stroysales.ru/sitemap.xml',
    host: 'https://stroysales.ru',
  }
}
