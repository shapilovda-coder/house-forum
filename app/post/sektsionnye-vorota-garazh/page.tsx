import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Секционные ворота для гаража | СтройСейлс',
  description: 'Как выбрать секционные ворота для гаража. Размеры, утепление, автоматика, цены.',
}

export default function Article() {
  return (
    <>
      <style>{`
        .article-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .article { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .article h1 { font-size: 32px; color: #1e3a5f; margin-bottom: 20px; }
        .article h2 { font-size: 24px; color: #1e3a5f; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #2563eb; }
        .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
        .tag { background: #2563eb; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px; margin-right: 10px; }
        .intro { background: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #2563eb; margin-bottom: 25px; }
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
            <a href="/" className="text-[#2d5a87]">Главная</a> → <a href="/blog/" className="text-[#2d5a87]">Блог</a> → Секционные ворота для гаража
          </div>
        </div>

        <div className="article-container">
          <article className="article">
            <div className="meta">
              <span className="tag">Ворота</span>
              <span>📅 17 марта 2026</span>
            </div>
            <h1>Секционные ворота для гаража: полное руководство</h1>
            <div className="intro">
              <p>На рынке десятки вариантов, но если нужен <strong>оптимальный баланс цены, теплоизоляции и удобства</strong> — выбор очевиден. Секционные ворота занимают 60% рынка.</p>
            </div>
            <h2>Принцип работы</h2>
            <p>Секционные ворота состоят из 4-6 панелей. При открывании полотно поднимается вверх и уходит под потолок, складываясь параллельно полу.</p>
            <h2>Сколько стоят</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Полотно (2.5×2.1 м): <strong>35 000 — 55 000 ₽</strong></li>
              <li>Направляющие: <strong>8 000 — 12 000 ₽</strong></li>
              <li>Электропривод: <strong>18 000 — 35 000 ₽</strong></li>
              <li>Монтаж: <strong>10 000 — 15 000 ₽</strong></li>
            </ul>
            <p><strong>Где заказать:</strong> <a href="https://stekloroll.ru/" target="_blank" className="text-blue-600">StekloRoll</a> — подбор и установка под ключ.</p>
          </article>
        </div>
      </div>
    </>
  )
}
