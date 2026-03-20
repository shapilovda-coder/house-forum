import type { Metadata, Viewport } from 'next'
import Link from 'next/link'
import Script from 'next/script'
import Footer from './components/Footer'
import SearchButton from './components/SearchButton'
import { OrganizationSchema, WebSiteSchema } from './components/SchemaOrg'
import { ClientLayout } from './components/ClientLayout'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#2563eb',
}

export const metadata: Metadata = {
  title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления',
  description: 'Проверенные поставщики рольставней, ворот, мягких окон и безрамного остекления в Москве, Санкт-Петербурге и других регионах.',
  keywords: ['рольставни', 'ворота', 'остекление', 'поставщики', 'каталог', 'Москва', 'Санкт-Петербург'],
  authors: [{ name: 'СтройСейлс' }],
  creator: 'СтройСейлс',
  publisher: 'СтройСейлс',
  metadataBase: new URL('https://stroysales.ru'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://stroysales.ru/',
    siteName: 'СтройСейлс',
    title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления',
    description: 'Проверенные поставщики рольставней, ворот, мягких окон и безрамного остекления в Москве, Санкт-Петербурге и других регионах.',
    images: [
      {
        url: '/hero-banner.webp',
        width: 1200,
        height: 630,
        alt: 'СтройСейлс — каталог поставщиков',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'СтройСейлс — каталог поставщиков рольставней, ворот и остекления',
    description: 'Проверенные поставщики рольставней, ворот, мягких окон и безрамного остекления.',
    images: ['/hero-banner.webp'],
  },
  verification: {
    yandex: '0b44c9af9afed784',
  },
  other: {
    'format-detection': 'telephone=no',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <head>
        {/* Preconnect for external resources */}
        <link rel="preconnect" href="https://mc.yandex.ru" />
        <link rel="dns-prefetch" href="https://mc.yandex.ru" />
      </head>
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
          {/* Schema.org Structured Data */}
          <OrganizationSchema />
          <WebSiteSchema />

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
