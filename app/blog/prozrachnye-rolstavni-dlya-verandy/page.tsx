import { Metadata } from 'next'
import Link from 'next/link'
import { ArticleLayout } from '../components/ArticleLayout'

export const metadata: Metadata = {
  title: 'Прозрачные рольставни для веранды | СтройСейлс',
  description: 'Как выбрать прозрачные рольставни для веранды. Сравнение материалов, виды управления, цены.',
}

export default function Article() {
  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'Главная', href: '/' },
        { label: 'Блог', href: '/blog/' },
        { label: 'Прозрачные рольставни для веранды' },
      ]}
      tag="Прозрачные рольставни"
      tagColor="green"
      date="17 марта 2026"
      title="Прозрачные рольставни для веранды: как выбрать и не переплатить"
    >
      <p className="lead text-gray-600 text-lg mb-6">
        Мечтаете остеклить веранду? <strong>Прозрачные рольставни</strong> — решение, которое объединяет быстрый монтаж, панорамный обзор и защиту от непогоды.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Что такое прозрачные рольставни</h2>
      <p className="text-gray-700 mb-4">
        Прозрачные рольставни — рулонные системы из поликарбоната или ПВХ, которые монтируются в проём и сворачиваются в компактный короб.
      </p>

      <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Цены</h2>
      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
        <li>ПВХ-плёнка: <strong>от 4 500 ₽/м²</strong></li>
        <li>Поликарбонат 6 мм: <strong>от 6 500 ₽/м²</strong></li>
        <li>Монолитный + электро: <strong>от 9 000 ₽/м²</strong></li>
      </ul>

      <div className="bg-orange-50 border-l-4 border-orange-500 p-6 my-8">
        <p className="text-gray-800 mb-2"><strong>Где заказать:</strong></p>
        <p className="text-gray-700">
          <Link href="https://stekloroll.ru/" target="_blank" className="text-blue-600 hover:underline font-medium">
            StekloRoll
          </Link> — бесплатный замер и установка.
        </p>
      </div>
    </ArticleLayout>
  )
}
