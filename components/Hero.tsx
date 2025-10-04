'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useState, FormEvent } from 'react'
import { useSearch } from '@/context/SearchContext'
import { useRouter } from 'next/navigation'

export default function Hero() {
  const [localSearch, setLocalSearch] = useState('')
  const { setSearchTerm } = useSearch()
  const router = useRouter()

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()
    setSearchTerm(localSearch)
    router.push('/tienda')
  }

  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 py-24 overflow-hidden">
      {/* Imagen decorativa de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="relative w-full h-full">
          <Image
            src="/images/Arte.jpeg"
            alt="Arte de fondo"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Contenido */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            &ldquo;Painting is another way of breathing.&rdquo;
          </h1>
          <p className="text-xl text-gray-600 mb-8">
          In a simple stroke, a universe can fit. ˶ᵔ ᵕ ᵔ˶
          </p>

          {/* Barra de búsqueda */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Buscar en Isacvxart"
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button 
              type="submit"
              className="px-8 py-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors font-medium"
            >
              Buscar
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

