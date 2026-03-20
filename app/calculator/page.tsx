import { Metadata } from 'next'
import { getCalculatorMetadata } from '@/lib/seo/catalog'
import CalculatorClient from './CalculatorClient'

export async function generateMetadata(): Promise<Metadata> {
  const seo = getCalculatorMetadata();
  return {
    title: seo.title,
    description: seo.description,
  };
}

export default function CalculatorPage() {
  const seo = getCalculatorMetadata();
  
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
        </div>
      </header>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">{seo.h1}</h1>
        <p className="text-gray-500 text-center mb-8">Прозрачные рольставни</p>

        <CalculatorClient />

        {/* H2 Sections */}
        <div className="mt-8 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{seo.h2[0]}</h2>
            <p className="text-sm text-gray-600">
              Стоимость прозрачных рольставней рассчитывается исходя из площади полотна, 
              типа профиля (стандартный или премиум) и вида управления (ручное или электропривод). 
              Калькулятор показывает базовую цену с учётом монтажа и доставки.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{seo.h2[1]}</h2>
            <ul className="text-sm text-gray-600 space-y-2 list-disc list-inside">
              <li><strong>Размеры проёма</strong> — ширина и высота в миллиметрах</li>
              <li><strong>Тип профиля</strong> — стандартный или премиум (усиленный)</li>
              <li><strong>Управление</strong> — ручное или электропривод (+30% к стоимости)</li>
              <li><strong>Сложность монтажа</strong> — точная цена после замера</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
