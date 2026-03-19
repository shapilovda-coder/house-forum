import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Секционные ворота для гаража | СтройСейлс',
  description: 'Как выбрать секционные ворота для гаража. Размеры, утепление, автоматика, цены. Сравнение с откатными и рулонными.',
}

export default function Article() {
  return (
    <div className="min-h-screen bg-gray-100 pb-10">
      {/* Breadcrumbs */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-sm text-gray-600">
          <Link href="/" className="text-blue-600 hover:underline">Главная</Link>
          <span className="mx-2">→</span>
          <Link href="/blog/" className="text-blue-600 hover:underline">Блог</Link>
          <span className="mx-2">→</span>
          <span className="text-gray-900">Секционные ворота для гаража</span>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">Ворота</span>
            <span>📅 17 марта 2026</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Секционные ворота для гаража: полное руководство</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead text-gray-600 text-lg mb-6">
              На рынке десятки вариантов, но если нужен <strong>оптимальный баланс цены, теплоизоляции и удобства</strong> — выбор очевиден. Секционные ворота занимают 60% рынка.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Принцип работы</h2>
            <p className="text-gray-700 mb-4">
              Секционные ворота состоят из 4-6 панелей. При открывании полотно поднимается вверх и уходит под потолок, складываясь параллельно полу.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Сколько стоят</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
              <li>Полотно (2.5×2.1 м): <strong>35 000 — 55 000 ₽</strong></li>
              <li>Направляющие: <strong>8 000 — 12 000 ₽</strong></li>
              <li>Электропривод: <strong>18 000 — 35 000 ₽</strong></li>
              <li>Монтаж: <strong>10 000 — 15 000 ₽</strong></li>
            </ul>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
              <p className="text-gray-800 mb-2"><strong>Где заказать:</strong></p>
              <p className="text-gray-700">
                <Link href="https://stekloroll.ru/" target="_blank" className="text-blue-600 hover:underline font-medium">
                  StekloRoll
                </Link> — подбор и установка под ключ.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
