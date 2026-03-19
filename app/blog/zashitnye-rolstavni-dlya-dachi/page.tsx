import { Metadata } from 'next'
import Link from 'next/link'
import { ArticleLayout } from '../components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Защитные рольставни для дачи | СтройСейлс',
  description: 'Как выбрать защитные рольставни для дачи. Экструдерный и стальной профиль, замки, автоматика, цены.',
}

export default function Article() {
  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Блог', href: '/blog/' },
        { label: 'Защитные рольставни для дачи' },
      ]}
      tag="Защитные рольставни"
      tagColor="red"
      date="17 марта 2026"
      title="Защитные рольставни для дачи: защита от взлома"
    >
      <p className="lead text-gray-600 text-lg mb-6">
        Дачный сезон — время, когда загородные дома остаются без присмотра на недели. Статистика МВД: летом число краж из частных домовладений возрастает на 40%. <strong>Защитные рольставни</strong> — это полноценная система безопасности.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">В чём отличие от обычных?</h2>
      <p className="text-gray-700 mb-4">
        Защитные рольставни используют экструдерный алюминий 1.2-1.5 мм или сталь до 1.5 мм с ребрами жёсткости, пенополиуретан для поглощения ударов, встроенные ригельные замки и стальной антивандальный короб.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Цены</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li>Оконный проём 1.0×1.2 м, экструдер: <strong>25 000 — 35 000 ₽</strong></li>
        <li>Дверной проём 2.0×2.2 м, стальной профиль: <strong>55 000 — 75 000 ₽</strong></li>
        <li>Электропривод: +<strong>15 000 — 25 000 ₽</strong></li>
      </ul>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
        <p className="text-gray-800 mb-2"><strong>Где заказать:</strong></p>
        <p className="text-gray-700">
          <Link href="https://stekloroll.ru/rolstavni_glukhie" target="_blank" className="text-blue-600 hover:underline font-medium">
            StekloRoll
          </Link> — подбор и установка под ключ.
        </p>
      </div>
    </ArticleLayout>
  )
}
