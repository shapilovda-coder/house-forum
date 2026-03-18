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

const articles = [
  {
    slug: 'post/prozrachnye-rolstavni-dlya-verandy',
    title: 'Прозрачные рольставни для веранды: как выбрать и не переплатить',
    excerpt: 'Мечтаете остеклить веранду? Разбираем, как работают прозрачные роллеты, чем они выгодно отличаются от классического остекления.',
    date: '17 марта 2026',
    category: 'Прозрачные рольставни',
  },
  {
    slug: 'post/zashitnye-rolstavni-dlya-dachi',
    title: 'Защитные рольставни для дачи: защита от взлома и непрошеных гостей',
    excerpt: 'Как выбрать и установить защитные рольставни для загородного дома. Экструдерный и стальной профиль, замки, автоматика.',
    date: '17 марта 2026',
    category: 'Защитные рольставни',
  },
  {
    slug: 'post/sektsionnye-vorota-garazh',
    title: 'Секционные ворота для гаража: полное руководство по выбору',
    excerpt: 'Как выбрать секционные ворота для гаража. Размеры, утепление, автоматика, цены. Сравнение с откатными и рулонными.',
    date: '17 марта 2026',
    category: 'Ворота',
  },
  {
    slug: 'myagkie-okna-dlya-besedki',
    title: 'Мягкие окна для беседки: за и против',
    excerpt: 'Сравниваем мягкие окна с обычным остеклением. Когда выгодно, а когда нет.',
    date: '18 февраля 2025',
    category: 'Мягкие окна',
  },
  {
    slug: 'vorota-dlya-garazha-vidy',
    title: 'Виды ворот для гаража: секционные, откатные, рулонные',
    excerpt: 'Подробный разбор типов ворот, их плюсов и минусов для разных задач.',
    date: '15 февраля 2025',
    category: 'Ворота',
  },
]

export default function BlogPage() {
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
              <a href={`/blog/${article.slug}/`} className="block">
                <div className="text-xs text-orange-600 font-medium mb-2">{article.category}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition">{article.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <time className="text-xs text-gray-400" dateTime={article.date}>{article.date}</time>
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
