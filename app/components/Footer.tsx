import Link from 'next/link'
import { CATEGORIES } from '@/lib/seo/catalog'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-white py-10 mt-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Категории</h3>
            <ul className="space-y-2">
              {CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link 
                    href={`/${cat.slug}/`}
                    className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Regions */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Регионы</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/postavshchiki/"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Москва и МО
                </Link>
              </li>
              <li>
                <Link 
                  href="/postavshchiki/"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  СПб и ЛО
                </Link>
              </li>
            </ul>          
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">Компания</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/blog/"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Блог
                </Link>
              </li>
              <li>
                <Link 
                  href="/kontakty/"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link 
                  href="/postavshchiki/"
                  className="text-gray-400 text-sm hover:text-white transition-colors duration-200"
                >
                  Все поставщики
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="pt-8 border-t border-gray-800">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} СтройСейлс. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  )
}
