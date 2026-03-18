import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Прозрачные рольставни для веранды | СтройСейлс',
  description: 'Как выбрать прозрачные рольставни для веранды. Сравнение материалов, виды управления, цены.',
}

export default function Article() {
  return (
    <>
      <style>{`
        .article-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .article { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .article h1 { font-size: 32px; color: #1e3a5f; margin-bottom: 20px; }
        .article h2 { font-size: 24px; color: #1e3a5f; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #4CAF50; }
        .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
        .tag { background: #4CAF50; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px; margin-right: 10px; }
        .intro { background: #E8F5E9; padding: 20px; border-radius: 8px; border-left: 4px solid #4CAF50; margin-bottom: 25px; }
      `}</style>
      
      <div className="bg-gray-100 min-h-screen pb-10">
        <header className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white">
          <div className="bg-black/20 py-2">
            <div className="max-w-[1200px] mx-auto px-5 flex justify-between items-center text-sm">
              <span>📍 Каталог поставщиков рольставней, ворот и остекления</span>
              <div>
                <a href="tel:+74951510979" className="text-yellow-400 ml-4">📞 +7 (495) 151-09-79</a>
                <a href="mailto:info@stroysales.ru" className="text-yellow-400 ml-4">✉️ info@stroysales.ru</a>
              </div>
            </div>
          </div>
          <div className="max-w-[1200px] mx-auto px-5 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <span>🏗️ Строй</span>
              <span className="text-yellow-400">Сейлс</span>
            </div>
            <nav className="flex gap-6">
              <a href="/" className="font-medium">Главная</a>
              <a href="/postavshchiki/" className="font-medium">Поставщики</a>
              <a href="/blog/" className="font-medium">Блог</a>
              <a href="/calculator/" className="font-medium">Калькулятор</a>
              <a href="/contacts/" className="font-medium">Контакты</a>
            </nav>
          </div>
        </header>

        <div className="bg-white py-4">
          <div className="max-w-[1200px] mx-auto px-5 text-sm text-gray-600">
            <a href="/" className="text-[#2d5a87]">Главная</a> → <a href="/blog/" className="text-[#2d5a87]">Блог</a> → Прозрачные рольставни для веранды
          </div>
        </div>

        <div className="article-container">
          <article className="article">
            <div className="meta">
              <span className="tag">Прозрачные рольставни</span>
              <span>📅 17 марта 2026</span>
            </div>
            <h1>Прозрачные рольставни для веранды: как выбрать и не переплатить</h1>
            <div className="intro">
              <p>Мечтаете остеклить веранду? <strong>Прозрачные рольставни</strong> — решение, которое объединяет быстрый монтаж, панорамный обзор и защиту от непогоды.</p>
            </div>
            <h2>Что такое прозрачные рольставни</h2>
            <p>Прозрачные рольставни — рулонные системы из поликарбоната или ПВХ, которые монтируются в проём и сворачиваются в компактный короб.</p>
            <h2>Цены</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>ПВХ-плёнка: <strong>от 4 500 ₽/м²</strong></li>
              <li>Поликарбонат 6 мм: <strong>от 6 500 ₽/м²</strong></li>
              <li>Монолитный + электро: <strong>от 9 000 ₽/м²</strong></li>
            </ul>
            <p><strong>Где заказать:</strong> <a href="https://stekloroll.ru/" target="_blank" className="text-blue-600">StekloRoll</a> — бесплатный замер и установка.</p>
          </article>
        </div>
      </div>
    </>
  )
}
