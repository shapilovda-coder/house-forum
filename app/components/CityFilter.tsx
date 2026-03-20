'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface CityFilterProps {
  cities: string[]
  selectedCity: string | null
}

export default function CityFilter({ cities, selectedCity }: CityFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const handleCityChange = (city: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (city) {
      params.set('city', city)
    } else {
      params.delete('city')
    }
    
    // Update URL without page reload
    router.push(`?${params.toString()}`, { scroll: false })
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Город:</span>
        
        <button
          onClick={() => handleCityChange(null)}
          className={`px-3 py-1 rounded-full text-sm transition ${
            !selectedCity 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Все
        </button>
        
        {cities.map(city => (
          <button
            key={city}
            onClick={() => handleCityChange(city)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              selectedCity === city 
                ? 'bg-orange-500 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  )
}
