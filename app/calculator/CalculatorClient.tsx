'use client'

import { useState } from 'react'

export default function CalculatorClient() {
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [profile, setProfile] = useState('standard')
  const [management, setManagement] = useState('manual')
  const [price, setPrice] = useState<number | null>(null)

  const calculatePrice = () => {
    const w = parseFloat(width) || 0
    const h = parseFloat(height) || 0
    const area = (w * h) / 1000000
    
    const basePrice = profile === 'premium' ? 25000 : 18000
    const mgmtMultiplier = management === 'electric' ? 1.3 : 1
    
    const total = Math.round(area * basePrice * mgmtMultiplier)
    setPrice(total > 0 ? total : null)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
      {/* Width */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Ширина (мм)</label>
        <input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          placeholder="Например: 1500"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Height */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Высота (мм)</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Например: 2000"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Profile */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Профиль</label>
        <select
          value={profile}
          onChange={(e) => setProfile(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="standard">Стандартный</option>
          <option value="premium">Премиум (усиленный)</option>
        </select>
      </div>

      {/* Management */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Управление</label>
        <select
          value={management}
          onChange={(e) => setManagement(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
        >
          <option value="manual">Ручное</option>
          <option value="electric">Электропривод</option>
        </select>
      </div>

      {/* Calculate Button */}
      <button
        onClick={calculatePrice}
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition"
      >
        Рассчитать
      </button>

      {/* Result */}
      {price && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600 mb-1">Примерная стоимость:</p>
          <p className="text-3xl font-bold text-green-700">{price.toLocaleString('ru-RU')} ₽</p>
          <p className="text-xs text-gray-500 mt-2">Точную цену уточните у менеджера</p>
        </div>
      )}

      {/* CTA */}
      <div className="pt-4 border-t border-gray-200 space-y-2">
        <a
          href="tel:+79013440412"
          className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-3 rounded-lg transition"
        >
          Позвонить в StekloRoll
        </a>
        <a
          href="https://stekloroll.ru?utm_source=stroysales"
          className="block w-full border border-gray-300 hover:border-blue-500 text-gray-700 text-center font-semibold py-3 rounded-lg transition"
        >
          Перейти на сайт
        </a>
      </div>
    </div>
  )
}
