import { Metadata } from 'next'
import Link from 'next/link'
import { ArticleLayout } from '../components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Секционные ворота для гаража | СтройСейлс',
  description: 'Как выбрать секционные ворота для гаража. Размеры, утепление, автоматика, цены.',
}

export default function Article() {
  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Блог', href: '/blog/' },
        { label: 'Секционные ворота для гаража' },
      ]}
      tag="Ворота"
      tagColor="blue"
      date="17 марта 2026"
      title="Секционные ворота для гаража: полное руководство"
    >
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
    </ArticleLayout>
  )
}
