export const metadata = {
  title: 'Страница не найдена — 404 | СтройСейлс',
  description: 'Запрашиваемая страница не существует. Перейдите в каталог поставщиков рольставней, ворот и остекления в Москве.',
}

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-9xl font-bold text-orange-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Страница не найдена</h1>
        <p className="text-gray-600 mb-8">
          Запрашиваемая страница не существует или была удалена.
          Попробуйте перейти на главную или воспользуйтесь поиском.
        </p>

        <div className="space-y-3">
          <a
            href="/"
            className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
          >
            На главную
          </a>

          <a
            href="/blog/"
            className="block w-full bg-white border border-gray-300 hover:border-orange-500 text-gray-700 font-semibold py-3 rounded-lg transition"
          >
            Перейти в блог
          </a>
        </div>

        {/* Popular Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">Популярные разделы</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: 'Прозрачные рольставни', slug: 'prozrachnye-rolstavni' },
              { name: 'Ворота', slug: 'vorota' },
              { name: 'Мягкие окна', slug: 'myagkie-okna' },
              { name: 'Безрамное остекление', slug: 'bezramnoe-osteklenie' },
            ].map((link) => (
              <a
                key={link.slug}
                href={`/?category=${link.slug}`}
                className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600 hover:border-orange-500 hover:text-orange-600 transition"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
