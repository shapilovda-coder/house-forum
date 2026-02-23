import type { Metadata } from "next";
import "./globals.css";
import Footer from "./Footer";

export const metadata: Metadata = {
  title: "СтройСейлс — каталог поставщиков рольставней, ворот и остекления в России",
  description: "Найдите проверенных поставщиков рольставней, ворот, мягких окон и безрамного остекления в России. 400+ компаний, реальные отзывы, цены от производителей.",
  icons: {
    icon: '/favicon.ico',
  },
  other: {
    'yandex-verification': 'bdfc1695aaa0fc3e,0b44c9af9afed784,26990fd6b2fac83d',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased min-h-screen flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}