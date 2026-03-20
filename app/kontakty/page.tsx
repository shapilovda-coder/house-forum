export const metadata = {
  title: 'Контакты СтройСейлс',
  description: 'Свяжитесь с нами по вопросам рекламы и размещения в каталоге поставщиков.',
}

export default function ContactsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Контакты</h1>

        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <p className="text-gray-600 mb-6">
            По вопросам рекламы обращайтесь по телефону:
          </p>
          
          <a 
            href="tel:+79055529581" 
            className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition"
          >
            +7 (905) 552-95-81
          </a>
        </div>
      </div>
    </div>
  )
}
