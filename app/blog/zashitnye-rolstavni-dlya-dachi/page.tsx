import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Защитные рольставни для дачи | СтройСейлс',
  description: 'Как выбрать защитные рольставни для дачи. Экструдерный и стальной профиль, замки, автоматика, цены.',
}

export default function Article() {
  return (
    <>
      <style>{`
        .article-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .article { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .article h1 { font-size: 32px; color: #1e3a5f; margin-bottom: 20px; }
        .article h2 { font-size: 24px; color: #1e3a5f; margin: 30px 0 15px; padding-bottom: 10px; border-bottom: 2px solid #dc2626; }
        .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
        .tag { background: #dc2626; color: white; padding: 3px 10px; border-radius: 15px; font-size: 12px; margin-right: 10px; }
        .intro { background: #fef2f2; padding: 20px; border-radius: 8px; border-left: 4px solid #dc2626; margin-bottom: 25px; }
      `}</style>
      
      <div className="bg-gray-100 min-h-screen pb-10">
        {/* Header */}
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

        {/* Breadcrumbs */}
        <div className="bg-white py-4">
          <div className="max-w-[1200px] mx-auto px-5 text-sm text-gray-600">
            <a href="/" className="text-[#2d5a87]">Главная</a> → <a href="/blog/" className="text-[#2d5a87]">Блог</a> → Защитные рольставни для дачи
          </div>
        </div>

        {/* Content */}
        <div className="article-container">
          <article className="article">
            <div className="meta">
              <span className="tag">Защитные рольставни</span>
              <span>📅 17 марта 2026</span>
            </div>
            <h1>Защитные рольставни для дачи: защита от взлома</h1>
            <div className="intro">
              <p>Дачный сезон — время, когда загородные дома остаются без присмотра на недели. Статистика МВД: летом число краж из частных домовладений возрастает на 40%. <strong>Защитные рольставни</strong> — это полноценная система безопасности.</p>
            </div>
            <h2>В чём отличие от обычных?</h2>
            <p>Защитные рольставни используют экструдерный алюминий 1.2-1.5 мм или сталь до 1.5 мм с ребрами жёсткости, пенополиуретан для поглощения ударов, встроенные ригельные замки и стальной антивандальный короб.</p>
            <h2>Цены</h2>
            <ul className="list-disc pl-6 mb-4">
              <li>Оконный проём 1.0×1.2 м, экструдер: <strong>25 000 — 35 000 ₽</strong></li>
              <li>Дверной проём 2.0×2.2 м, стальной профиль: <strong>55 000 — 75 000 ₽</strong></li>
              <li>Электропривод: +<strong>15 000 — 25 000 ₽</strong></li>
            </ul>
            <p><strong>Где заказать:</strong> <a href="https://stekloroll.ru/rolstavni_glukhie" target="_blank" className="text-blue-600">StekloRoll</a> — подбор и установка под ключ.</p>
          </article>
        </div>
      </div>
    </>
  )
}
