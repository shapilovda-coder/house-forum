'use client'

export default function SearchButton() {
  return (
    <button 
      className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('open-search'))
      }}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <span className="hidden sm:inline">Поиск</span>
      <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 text-xs bg-gray-100 rounded">
        <span>⌘</span>K
      </kbd>
    </button>
  )
}
