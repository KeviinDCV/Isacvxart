'use client'

import { Search } from 'lucide-react'
import { useState, FormEvent } from 'react'
import { useSearch } from '@/context/SearchContext'
import { useRouter, usePathname } from 'next/navigation'

export default function SearchPopup() {
  const [localSearch, setLocalSearch] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const { setSearchTerm } = useSearch()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    if (localSearch.trim()) {
      setSearchTerm(localSearch)
      setIsVisible(false)
      setLocalSearch('')
      
      // Si no estamos en inicio, redirigir
      if (pathname !== '/') {
        router.push('/')
      } else {
        // Si estamos en inicio, hacer scroll a los productos
        const productsSection = document.getElementById('products-section')
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  }

  return (
    <>
      <button
        onClick={() => setIsVisible(true)}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
        aria-label="Buscar"
      >
        <Search className="w-5 h-5 text-gray-600" />
      </button>

      {isVisible && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm animate-fadeIn md:hidden">
          <div className="bg-white p-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="search-input"
                  type="text"
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  placeholder="Buscar obras de arte..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Buscar
              </button>
              <button
                type="button"
                onClick={() => setIsVisible(false)}
                className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Desktop search */}
      <div className="hidden md:block absolute right-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        <form onSubmit={handleSearch} className="bg-white rounded-xl shadow-xl border border-gray-200 p-4 w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Buscar obras de arte..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-3 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Buscar
          </button>
        </form>
      </div>
    </>
  )
}

