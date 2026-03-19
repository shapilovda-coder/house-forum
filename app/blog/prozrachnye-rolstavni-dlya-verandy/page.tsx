import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Прозрачные рольставни для веранды | СтройСейлс',
  description: 'Как выбрать прозрачные рольставни для веранды. Сравнение материалов, виды управления, цены.',
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
          <span className="text-gray-900">Прозрачные рольставни для веранды</span>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <article className="bg-white rounded-lg shadow-sm p-6 md:p-10">
          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Прозрачные рольставни</span>
            <span>📅 17 марта 2026</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-6">Прозрачные рольставни для веранды: как выбрать и не переплатить</h1>

          <div className="prose prose-lg max-w-none">
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
          </div>
        </article>
      </div>
    </div>
  )
}
