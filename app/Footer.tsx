export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">СтройСейлс</span>
            </div>
            <p className="text-sm text-gray-400 mb-4">
              Каталог поставщиков рольставней, ворот и остекления в Москве и России
            </p>
            <div className="flex gap-3">
              <a href="https://t.me/stroysales" target="_blank" rel="noopener noreferrer" 
                 className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/prozrachnye-rolstavni/" className="hover:text-white transition">Прозрачные рольставни</a></li>
              <li><a href="/zashchitnye-rolstavni/" className="hover:text-white transition">Защитные рольставни</a></li>
              <li><a href="/vorota/" className="hover:text-white transition">Ворота</a></li>
              <li><a href="/bezramnoe-osteklenie/" className="hover:text-white transition">Безрамное остекление</a></li>
              <li><a href="/myagkie-okna/" className="hover:text-white transition">Мягкие окна</a></li>
              <li><a href="/rolletnye-shkafy/" className="hover:text-white transition">Роллетные шкафы</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Компания</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/blog/" className="hover:text-white transition">Блог</a></li>
              <li><a href="/kontakty/" className="hover:text-white transition">Контакты</a></li>
              <li><a href="/o-proekte/" className="hover:text-white transition">О проекте</a></li>
              <li><a href="/calculator/" className="hover:text-white transition">Калькулятор</a></li>
            </ul>
            
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-2">Реклама на сайте:</p>
              <a href="tel:+79055529581" className="text-sm text-blue-400 hover:text-blue-300 transition">
                +7 (905) 552-95-81
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-white font-semibold mb-4">Оставить заявку</h3>
            <form className="space-y-3" action="/kontakty/" method="GET">
              <input 
                type="text" 
                name="name"
                placeholder="Ваше имя"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
              <input 
                type="tel" 
                name="phone"
                placeholder="Телефон"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                required
              />
              <button 
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} СтройСейлс. Все права защищены.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="/politika-konfidentsialnosti/" className="hover:text-gray-300 transition">Политика конфиденциальности</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
