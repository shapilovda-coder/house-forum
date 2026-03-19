'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'

interface SearchResult {
  title: string
  url: string
  description: string
  type: 'category' | 'article' | 'supplier'
}

// Indexed data for search
const searchIndex: SearchResult[] = [
  // Categories
  { title: 'Прозрачные рольставни', url: '/prozrachnye-rolstavni/', description: 'Остекление веранд и террас', type: 'category' },
  { title: 'Защитные рольставни', url: '/zashitnye-rolstavni/', description: 'Защита от взлома', type: 'category' },
  { title: 'Безрамное остекление', url: '/bezramnoe-osteklenie/', description: 'Панорамное остекление', type: 'category' },
  { title: 'Ворота', url: '/vorota/', description: 'Секционные и откатные ворота', type: 'category' },
  { title: 'Мягкие окна', url: '/myagkie-okna/', description: 'ПВХ-шторы для беседок', type: 'category' },
  { title: 'Роллетные шкафы', url: '/rolletnye-shkafy/', description: 'Шкафы с рольставнями', type: 'category' },
  { title: 'Офисные перегородки', url: '/ofisnye-peregorodki/', description: 'Перегородки для офисов', type: 'category' },
  
  // Articles
  { title: 'Прозрачные рольставни для веранды', url: '/blog/prozrachnye-rolstavni-dlya-verandy/', description: 'Как выбрать и не переплатить', type: 'article' },
  { title: 'Защитные рольставни для дачи', url: '/blog/zashitnye-rolstavni-dlya-dachi/', description: 'Защита от взлома', type: 'article' },
  { title: 'Секционные ворота для гаража', url: '/blog/sektsionnye-vorota-garazh/', description: 'Полное руководство', type: 'article' },
  { title: 'Как выбрать прозрачные рольставни', url: '/blog/kak-vybrat-prozrachnye-rolstavni/', description: 'Пошаговый гид', type: 'article' },
  
  // Pages
  { title: 'Калькулятор стоимости', url: '/calculator/', description: 'Расчёт цены онлайн', type: 'category' },
  { title: 'Все поставщики', url: '/postavshchiki/', description: 'Каталог компаний', type: 'category' },
  { title: 'Блог', url: '/blog/', description: 'Полезные статьи', type: 'category' },
  { title: 'Контакты', url: '/kontakty/', description: 'Связаться с нами', type: 'category' },
]

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  
  const results = useMemo(() => {
    if (!query.trim()) return []
    const lower = query.toLowerCase()
    return searchIndex.filter(item =>
      item.title.toLowerCase().includes(lower) ||
      item.description.toLowerCase().includes(lower)
    ).slice(0, 8)
  }, [query])
  
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder="Поиск по каталогу..."
            className="w-full text-lg outline-none"
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoFocus
          />
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {results.length === 0 && query && (
            <div className="p-4 text-gray-500">Ничего не найдено</div>
          )}
          
          {results.map((item, i) => (
            <Link
              key={i}
              href={item.url}
              onClick={onClose}
              className="block p-4 hover:bg-gray-50 border-b last:border-0"
            >
              <div className="flex items-center gap-2">
                <span className={`
                  text-xs px-2 py-1 rounded
                  ${item.type === 'category' ? 'bg-blue-100 text-blue-700' : ''}
                  ${item.type === 'article' ? 'bg-green-100 text-green-700' : ''}
                  ${item.type === 'supplier' ? 'bg-orange-100 text-orange-700' : ''}
                `}>
                  {item.type === 'category' && 'Категория'}
                  {item.type === 'article' && 'Статья'}
                  {item.type === 'supplier' && 'Поставщик'}
                </span>
              </div>
              <div className="font-medium mt-1">{item.title}</div>
              <div className="text-sm text-gray-500">{item.description}</div>
            </Link>
          ))}
        </div>
        
        <div className="p-3 text-xs text-gray-400 border-t flex justify-between">
          <span>Нажмите ESC для закрытия</span>
          <span>{results.length} результатов</span>
        </div>
      </div>
    </div>
  )
}
