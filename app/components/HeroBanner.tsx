import Link from 'next/link'

export default function HeroBanner() {
  return (
    <>
      {/* Hero Banner SVG */}
      <div className="relative w-full">
        <img src="/hero-banner.svg" alt="" className="w-full h-auto" />
      </div>

      {/* Hero Text */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">
            Каталог проверенных поставщиков рольставней, ворот и остекления
          </h1>
          <p className="text-lg text-blue-100">
            400+ компаний в Москве, Санкт-Петербурге и других регионах
          </p>
        </div>
      </div>
    </>
  )
}
