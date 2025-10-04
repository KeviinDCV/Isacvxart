'use client'

import { Search, ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useCart } from '@/context/CartContext'
import CartDropdown from './CartDropdown'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { items } = useCart()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  const isActive = (path: string) => pathname === path

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-gray-100 py-4 px-4 sm:px-6 lg:px-12'
    }`}>
      <div className={`mx-auto transition-all duration-300 ${
        isScrolled 
          ? 'max-w-full' 
          : 'max-w-7xl bg-white rounded-2xl shadow-sm border border-gray-200'
      }`}>
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo - Izquierda */}
          <Link href="/" className="flex items-center gap-2 flex-1">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">❤</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Isacvxart</span>
          </Link>

          {/* Navegación - Centrada */}
          <nav className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <Link 
              href="/" 
              className={`transition-colors ${
                isActive('/') 
                  ? 'text-gray-900 font-bold' 
                  : 'text-gray-600 hover:text-gray-900 font-medium'
              }`}
            >
              Inicio
            </Link>
            <Link 
              href="/tienda" 
              className={`transition-colors ${
                isActive('/tienda') 
                  ? 'text-gray-900 font-bold' 
                  : 'text-gray-600 hover:text-gray-900 font-medium'
              }`}
            >
              Tienda
            </Link>
          </nav>

          {/* Acciones - Derecha */}
          <div className="flex items-center gap-4 flex-1 justify-end">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Buscar"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
                aria-label="Carrito"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </button>
              <CartDropdown isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            </div>
            <button 
              className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors flex items-center justify-center"
              aria-label="Perfil"
            >
              <User className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

