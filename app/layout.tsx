import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'

export const metadata: Metadata = {
  title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления',
  description: 'Проверенные поставщики рольставней, ворот, мягких окон и безрамного остекления в Москве, Санкт-Петербурге и других регионах',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50">
        {/* Header — глобальный */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3L4 9v12h16V9l-8-6zm0 2.2L18.5 9H5.5L12 5.2zM6 19v-9h12v9H6z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">
                Строй<span className="text-orange-500">Сейлс</span>
              </span>
            </Link>
            <span className="text-sm text-gray-500 hidden sm:block">Каталог поставщиков</span>
          </div>
        </header>

        {/* Main content */}
        {children}

        {/* Footer — глобальный */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="max-w-5xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="font-semibold mb-2">Категории</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li><Link href="/prozrachnye-rolstavni/" className="hover:text-white">Прозрачные рольставни</Link></li>
                  <li><Link href="/zashchitnye-rolstavni/" className="hover:text-white">Защитные рольставни</Link></li>
                  <li><Link href="/vorota/" className="hover:text-white">Ворота</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Регионы</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li><Link href="/prozrachnye-rolstavni/moskva-i-mo/" className="hover:text-white">Москва и МО</Link></li>
                  <li><Link href="/prozrachnye-rolstavni/spb-lo/" className="hover:text-white">СПб и ЛО</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Компания</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li><Link href="/blog/" className="hover:text-white">Блог</Link></li>
                  <li><Link href="/kontakty/" className="hover:text-white">Контакты</Link></li>
                </ul>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm">© 2026 СтройСейлс. Все права защищены.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
