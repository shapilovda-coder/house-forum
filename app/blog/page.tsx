import Link from 'next/link'
import { getAllBlogArticles } from '@/lib/blogArticles'

export const metadata = {
  title: 'Блог о рольставнях, воротах и остеклении — советы от экспертов | СтройСейлс',
  description: 'Полезные статьи о выборе и установке рольставней, ворот, мягких окон. Советы экспертов, обзоры материалов, сравнение цен.',
  keywords: 'рольставни, ворота, остекление, блог, статьи, советы, цены',
  openGraph: {
    title: 'Блог о рольставнях, воротах и остеклении — советы от экспертов',
    description: 'Полезные статьи о выборе и установке рольставней, ворот, мягких окон.',
    type: 'website',
    url: 'https://stroysales.ru/blog/',
    siteName: 'СтройСейлс',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Блог о рольставнях, воротах и остеклении',
    description: 'Полезные статьи о выборе и установке рольставней, ворот.',
  },
  alternates: {
    canonical: 'https://stroysales.ru/blog/',
  },
}

export default function BlogPage() {
  const articles = getAllBlogArticles()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Schema.org BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Главная',
                item: 'https://stroysales.ru/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Блог',
                item: 'https://stroysales.ru/blog/',
              },
            ],
          }),
        }}
      />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex space-x-2">
            <li>
              <a href="/" className="hover:text-blue-600">Главная</a>
            </li>
            <li><span className="text-gray-400">/</span></li>
            <li><span className="text-gray-900">Блог</span></li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Блог</h1>
        <p className="text-gray-600 mb-8">Полезные статьи о выборе и установке рольставней, ворот и остекления. Советы экспертов, обзоры материалов, сравнение цен.</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <article key={article.slug} className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6">
              <Link href={`/blog/${article.slug}/`} className="block">
                <div className="text-xs text-orange-600 font-medium mb-2">{article.categoryLabel}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <time className="text-xs text-gray-400" dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString('ru-RU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
