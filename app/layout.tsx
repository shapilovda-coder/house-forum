import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from './components/Footer'
import SearchButton from './components/SearchButton'
import { OrganizationSchema } from './components/SchemaOrg'
import { ClientLayout } from './components/ClientLayout'
import './globals.css'

export const metadata: Metadata = {
  title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления',
  description: 'Проверенные поставщики рольставней, ворот, мягких окон и безрамного остекления в Москве, Санкт-Петербурге и других регионах.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-gray-50">
        {process.env.NODE_ENV === "production" && (
          <>
            <Script id="yandex-metrika" strategy="afterInteractive">
              {`
                (function(m,e,t,r,i,k,a){
                  m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();
                  for (var j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) { return; }
                  }
                  k=e.createElement(t),a=e.getElementsByTagName(t)[0],
                  k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=107013655','ym');
                const isProdHost = typeof window !== 'undefined' && /(^|\\.)stroysales\\.ru$/.test(window.location.hostname);
                if (isProdHost) {
                  ym(107013655, 'init', {
                    ssr:true,
                    webvisor:true,
                    clickmap:true,
                    ecommerce:"dataLayer",
                    accurateTrackBounce:true,
                    trackLinks:true
                  });
                }
              `}
            </Script>
            <noscript>
              <div>
                <img src="https://mc.yandex.ru/watch/107013655" style={{ position: "absolute", left: "-9999px" }} alt="" />
              </div>
            </noscript>
          </>
        )}

        <ClientLayout>
          {/* Schema.org Organization */}
          <OrganizationSchema />

          {/* Header — глобальный */}
          <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
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
              
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 hidden md:block">Каталог поставщиков</span>
                
                {/* Search Button */}
                <SearchButton />
                
                <Link href="/postavshchiki/" className="text-sm text-blue-600 hover:text-blue-800">
                  Все поставщики
                </Link>
              </div>
            </div>
          </header>

          {/* Main content */}
          {children}

          <Footer />
        </ClientLayout>
      </body>
    </html>
  )
}
