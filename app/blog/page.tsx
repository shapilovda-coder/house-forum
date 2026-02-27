export const metadata = {
  title: 'Блог о рольставнях, воротах и остеклении — советы от экспертов | СтройСейлс',
  description: 'Полезные статьи о выборе и установке рольставней, ворот, мягких окон. Советы экспертов, обзоры материалов, сравнение цен.',
}

const articles = [
  {
    slug: 'kak-vybrat-prozrachnye-rolstavni',
    title: 'Как выбрать прозрачные рольставни: полное руководство',
    excerpt: 'Разбираем виды профилей, управление, монтаж и типичные ошибки при выборе.',
    date: '2025-02-20',
    category: 'Прозрачные рольставни',
  },
  {
    slug: 'myagkie-okna-dlya-besedki',
    title: 'Мягкие окна для беседки: за и против',
    excerpt: 'Сравниваем мягкие окна с обычным остеклением. Когда выгодно, а когда нет.',
    date: '2025-02-18',
    category: 'Мягкие окна',
  },
  {
    slug: 'vorota-dlya-garazha-vidy',
    title: 'Виды ворот для гаража: секционные, откатные, рулонные',
    excerpt: 'Подробный разбор типов ворот, их плюсов и минусов для разных задач.',
    date: '2025-02-15',
    category: 'Ворота',
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Блог</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/blog/${article.slug}/`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-6 block"
            >
              <div className="text-xs text-orange-600 font-medium mb-2">{article.category}</div>
              <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{article.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
              <div className="text-xs text-gray-400">{article.date}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
