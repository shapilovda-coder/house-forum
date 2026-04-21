import fs from 'fs'
import path from 'path'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArticleSchema, BreadcrumbSchema, FaqSchema } from '@/app/components/SchemaOrg'
import { getAllBlogArticles, getBlogArticle } from '@/lib/blogArticles'

function loadArticleHtml(slug: string) {
  const filePath = path.join(process.cwd(), 'public', 'blog', slug, 'index.html')

  if (!fs.existsSync(filePath)) {
    return null
  }

  const html = fs.readFileSync(filePath, 'utf-8')
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i)

  return articleMatch?.[1] ?? null
}

export async function generateStaticParams() {
  return getAllBlogArticles().map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = getBlogArticle(slug)

  if (!article) {
    return {
      title: 'Статья не найдена | СтройСейлс',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://stroysales.ru/blog/${article.slug}/`

  return {
    title: `${article.title} | СтройСейлс`,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'СтройСейлс',
      locale: 'ru_RU',
      images: [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [article.coverImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getBlogArticle(slug)
  const articleHtml = loadArticleHtml(slug)

  if (!article || !articleHtml) {
    notFound()
  }

  const relatedArticles = article.relatedSlugs
    .map((relatedSlug) => getBlogArticle(relatedSlug))
    .filter(Boolean)

  const canonicalUrl = `https://stroysales.ru/blog/${article.slug}/`

  return (
    <div className="min-h-screen bg-gray-100">
      <BreadcrumbSchema
        items={[
          { name: 'Главная', url: 'https://stroysales.ru/' },
          { name: 'Блог', url: 'https://stroysales.ru/blog/' },
          { name: article.title },
        ]}
      />
      <ArticleSchema
        title={article.title}
        description={article.description}
        url={canonicalUrl}
        image={`https://stroysales.ru${article.coverImage}`}
        datePublished={article.publishedAt}
        dateModified={article.updatedAt}
      />
      <FaqSchema items={article.faq} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-500 mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Главная
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog/" className="hover:text-blue-600">
                Блог
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{article.title}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-xl shadow-sm p-6 md:p-10">
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700"
            dangerouslySetInnerHTML={{ __html: articleHtml }}
          />

          <section className="mt-10 rounded-xl bg-blue-50 border border-blue-100 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Где искать подрядчика</h2>
            <p className="text-gray-700 mb-4">
              Для сравнения предложений переходите в каталог, а не ограничивайтесь одной компанией.
              Так проще сопоставить сроки, условия монтажа и цены по вашему региону.
            </p>
            <div className="flex flex-wrap gap-3">
              {article.internalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Частые вопросы</h2>
            <div className="space-y-3">
              {article.faq.map((item) => (
                <details key={item.question} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <summary className="cursor-pointer font-medium text-gray-900">{item.question}</summary>
                  <p className="mt-3 text-gray-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {relatedArticles.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Связанные статьи</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {relatedArticles.map((related) => (
                  <Link
                    key={related!.slug}
                    href={`/blog/${related!.slug}/`}
                    className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                  >
                    <div className="text-sm font-medium text-blue-600 mb-2">{related!.categoryLabel}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{related!.title}</h3>
                    <p className="text-sm text-gray-600">{related!.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </article>
      </div>
    </div>
  )
}
