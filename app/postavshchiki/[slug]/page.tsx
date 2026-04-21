import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BreadcrumbSchema, LocalBusinessSchema } from '@/app/components/SchemaOrg'
import { getCategoryName, getRegionName } from '@/lib/categories'
import { getPublishedSupplierBySlug, loadPublishedSuppliers } from '@/lib/suppliers'
import { getSupplierProfileSlug } from '@/lib/supplierProfileSlug'

export async function generateStaticParams() {
  return loadPublishedSuppliers().map((supplier) => ({ slug: supplier.profileSlug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const supplier = getPublishedSupplierBySlug(slug)

  if (!supplier) {
    return {
      title: 'Поставщик не найден | СтройСейлс',
      robots: { index: false, follow: false },
    }
  }

  const canonicalUrl = `https://stroysales.ru/postavshchiki/${supplier.profileSlug}/`
  const title = `${supplier.displayDomain} — поставщик в каталоге СтройСейлс`
  const description = `${supplier.displayDomain}: карточка поставщика с категориями, регионами, контактами и переходом на официальный сайт.`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'СтройСейлс',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function SupplierProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supplier = getPublishedSupplierBySlug(slug)

  if (!supplier) {
    notFound()
  }

  const relatedSuppliers = loadPublishedSuppliers()
    .filter((item) => item.profileSlug !== supplier.profileSlug)
    .filter((item) => item.categories.some((category) => supplier.categories.includes(category)))
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-gray-50">
      <BreadcrumbSchema
        items={[
          { name: 'Главная', url: 'https://stroysales.ru/' },
          { name: 'Все поставщики', url: 'https://stroysales.ru/postavshchiki/' },
          { name: supplier.displayDomain },
        ]}
      />
      <LocalBusinessSchema
        name={supplier.displayDomain}
        url={`https://stroysales.ru/postavshchiki/${supplier.profileSlug}/`}
        telephone={supplier.phones[0]}
        address={supplier.address}
      />

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
              <Link href="/postavshchiki/" className="hover:text-blue-600">
                Все поставщики
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{supplier.displayDomain}</li>
          </ol>
        </nav>

        <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                {supplier.isPinned && (
                  <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
                    Рекомендуем
                  </span>
                )}
                {supplier.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/${category}/`}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                  >
                    {getCategoryName(category)}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">{supplier.displayDomain}</h1>
              <p className="text-gray-600 mb-4">
                Карточка поставщика в каталоге СтройСейлс с базовой информацией, категориями и ссылкой на официальный сайт.
              </p>

              <div className="space-y-2 text-sm text-gray-700">
                {supplier.phones[0] && <p>📞 {supplier.phones[0]}</p>}
                {supplier.address && <p>📍 {supplier.address}</p>}
                {supplier.regions.length > 0 && (
                  <p>🌍 {supplier.regions.map((region) => getRegionName(region)).join(', ')}</p>
                )}
              </div>
            </div>

            <div className="w-full md:w-56 space-y-3">
              <a
                href={supplier.website}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="block rounded-lg bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Перейти на сайт
              </a>
              {supplier.phones[0] && (
                <a
                  href={`tel:${supplier.phones[0].replace(/[^\d+]/g, '')}`}
                  className="block rounded-lg border border-gray-300 px-4 py-3 text-center text-sm font-medium text-gray-700 transition hover:border-blue-400 hover:text-blue-700"
                >
                  Позвонить
                </a>
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="rounded-xl bg-gray-50 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Чем полезна карточка</h2>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside">
                <li>Помогает сравнить поставщика с альтернативами из той же категории.</li>
                <li>Собирает базовые контакты и регионы присутствия в одном месте.</li>
                <li>Служит промежуточной точкой перед переходом на официальный сайт.</li>
              </ul>
            </section>

            <section className="rounded-xl bg-gray-50 p-5">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Полезные переходы</h2>
              <div className="flex flex-wrap gap-2">
                {supplier.categories.map((category) => (
                  <Link
                    key={category}
                    href={`/${category}/`}
                    className="rounded-lg bg-white px-3 py-2 text-sm text-blue-600 transition hover:text-blue-800"
                  >
                    {getCategoryName(category)}
                  </Link>
                ))}
                {supplier.regions.map((region) =>
                  supplier.categories.map((category) => (
                    <Link
                      key={`${category}-${region}`}
                      href={`/${category}/${region}/`}
                      className="rounded-lg bg-white px-3 py-2 text-sm text-blue-600 transition hover:text-blue-800"
                    >
                      {getCategoryName(category)} — {getRegionName(region)}
                    </Link>
                  ))
                )}
              </div>
            </section>
          </div>
        </div>

        {relatedSuppliers.length > 0 && (
          <section className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Похожие компании</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedSuppliers.map((item) => (
                <Link
                  key={item.profileSlug}
                  href={`/postavshchiki/${getSupplierProfileSlug(item)}/`}
                  className="rounded-xl border border-gray-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <div className="text-sm font-medium text-blue-600 mb-2">{item.categories.map(getCategoryName).join(', ')}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.displayDomain}</h3>
                  <p className="text-sm text-gray-600">
                    {item.address || item.regions.map((region) => getRegionName(region)).join(', ')}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
