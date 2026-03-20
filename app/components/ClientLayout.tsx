'use client'

import { useState, useEffect } from 'react'
import { SearchModal } from './SearchModal'

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [searchOpen, setSearchOpen] = useState(false)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K для открытия поиска
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      // ESC для закрытия
      if (e.key === 'Escape') {
        setSearchOpen(false)
      }
    }
    
    // Custom event для открытия поиска
    const handleOpenSearch = () => setSearchOpen(true)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('open-search' as any, handleOpenSearch)
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('open-search' as any, handleOpenSearch)
    }
  }, [])
  
  return (
    <>
      {children}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
