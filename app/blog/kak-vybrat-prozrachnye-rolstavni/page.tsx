export const metadata = {
  title: 'Как выбрать прозрачные рольставни: полное руководство 2025 | СтройСейлс',
  description: 'Руководство по выбору прозрачных рольставней: материалы, профили, управление, цены. Советы по установке и обслуживанию. Сравните 65+ поставщиков в Москве.',
}

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold text-sm">S</div>
            <span className="text-lg font-bold text-gray-900">
              Строй<span className="text-blue-600">Сейлс</span>
            </span>
          </a>
          <a href="/blog/" className="text-sm text-gray-600 hover:text-orange-500">← Назад в блог</a>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="text-xs text-orange-600 font-medium mb-2">Прозрачные рольставни</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Как выбрать прозрачные рольставни: полное руководство
        </h1>
        
        <div className="text-sm text-gray-400 mb-8">20 февраля 2025</div>

        <div className="bg-white rounded-lg shadow-sm p-8 prose prose-lg max-w-none">
          <h2>Что такое прозрачные рольставни?</h2>
          <p>
            Прозрачные рольставни — это современное решение для защиты витрин, 
            террас и веранд. Они сочетают в себе прочность металлических рольставней 
            и прозрачность поликарбоната или алюминиевого профиля со стеклом.
          </p>

          <h2>Виды профилей</h2>
          
          <h3>1. Поликарбонатный профиль</h3>
          <p>
            Самый популярный вариант. Лёгкий, прочный, хорошо пропускает свет. 
            Подходит для большинства задач. Цена от 15 000 ₽/м².
          </p>

          <h3>2. Алюминиевый профиль со стеклом</h3>
          <p>
            Премиум-сегмент. Максимальная прочность и эстетика. 
            Цена от 25 000 ₽/м².
          </p>

          <h2>Управление</h2>
          
          <ul>
            <li><strong>Ручное</strong> — дешевле, но менее удобно</li>
            <li><strong>Электропривод</strong> — удобно, можно автоматизировать</li>
            <li><strong>Смарт-управление</strong> — через приложение, датчики</li>
          </ul>

          <h2>Типичные ошибки</h2>
          
          <ol>
            <li>Экономия на профиле — дешёвый поликарбонат желтеет через год</li>
            <li>Неправильный замер — зазоры, щели, негерметичность</li>
            <li>Самостоятельный монтаж — сложная конструкция, нужен профи</li>
          </ol>

          <h2>Вывод</h2>
          
          <p>
            Выбирайте прозрачные рольставни под конкретную задачу. 
            Для дома подойдёт поликарбонат, для бизнеса — алюминий со стеклом. 
            Обязательно заказывайте замер и монтаж у профессионалов.
          </p>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-orange-50 border border-orange-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-900 mb-2">Нужны прозрачные рольставни?</h3>
          <p className="text-gray-600 mb-4">
            Сравните 65 поставщиков в Москве и выберите лучшего.
          </p>
          <a
            href="/?category=prozrachnye-rolstavni"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            Смотреть поставщиков
          </a>
        </div>
      </article>
    </div>
  )
}
