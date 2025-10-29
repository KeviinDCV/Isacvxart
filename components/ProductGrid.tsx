'use client'

import ProductCard from './ProductCard'
import { useSearch } from '@/context/SearchContext'
import { useFilter } from '@/context/FilterContext'
import { useMemo, useEffect, useState, useRef } from 'react'
import { getProducts, type Product } from '@/lib/products'
import { ChevronDown } from 'lucide-react'

export default function ProductGrid() {
  const { searchTerm } = useSearch()
  const { selectedCategory, selectedFilters, sortOption, setSortOption } = useFilter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadProducts()
  }, [])

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const sortOptions = [
    { value: 'recent', label: 'Más Recientes' },
    { value: 'price-low', label: 'Precio: Bajo a Alto' },
    { value: 'price-high', label: 'Precio: Alto a Bajo' },
    { value: 'rating', label: 'Mejor Valorados' },
  ]

  const currentSortLabel = sortOptions.find(opt => opt.value === sortOption)?.label || 'Más Recientes'

  const loadProducts = async () => {
    setLoading(true)
    const data = await getProducts()
    setProducts(data)
    setLoading(false)
  }

  // Aplicar todos los filtros
  const filteredProducts = useMemo(() => {
    let filtered = [...products]

    // Filtrar por búsqueda
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
      )
    }

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Aplicar filtros especiales
    if (selectedFilters.includes('new')) {
      // Productos creados en los últimos 30 días
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      filtered = filtered.filter(product => {
        if (!product.created_at) return false
        return new Date(product.created_at) >= thirtyDaysAgo
      })
    }

    if (selectedFilters.includes('bestseller')) {
      // Productos con más reviews (más vendidos)
      filtered = filtered.filter(product => product.reviews > 0)
    }

    if (selectedFilters.includes('discount')) {
      // Productos que tienen descuento (discount_price no es null)
      filtered = filtered.filter(product => 
        product.discount_price !== null && 
        product.discount_price !== undefined &&
        product.discount_price < product.price
      )
    }

    // Aplicar ordenamiento
    // Si está activo el filtro "bestseller", ordenar por reviews primero
    if (selectedFilters.includes('bestseller')) {
      filtered.sort((a, b) => b.reviews - a.reviews)
    }

    // Aplicar ordenamiento seleccionado (si no es bestseller ya ordenado)
    if (!selectedFilters.includes('bestseller')) {
      switch (sortOption) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price)
          break
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating)
          break
        case 'recent':
        default:
          // Ordenar por fecha de creación (más recientes primero)
          filtered.sort((a, b) => {
            const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
            const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
            return dateB - dateA
          })
          break
      }
    }

    return filtered
  }, [searchTerm, products, selectedCategory, selectedFilters, sortOption])

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {searchTerm ? `Resultados para "${searchTerm}"` : 'Obras Destacadas'}
          </h2>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-1">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}
            </p>
          )}
        </div>
        
        {/* Dropdown selector personalizado */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors w-full sm:w-auto min-w-[220px] justify-between"
          >
            <span>{currentSortLabel}</span>
            <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-full sm:w-auto min-w-[220px] bg-white rounded-xl border border-gray-200 shadow-lg z-10 overflow-hidden">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value)
                    setIsDropdownOpen(false)
                  }}
                  className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                    sortOption === option.value
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-gray-600">
            {searchTerm || selectedCategory !== 'all' || selectedFilters.length > 0
              ? 'Intenta con otros términos de búsqueda o filtros'
              : 'No hay productos disponibles'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              price={product.price}
              rating={product.rating}
              reviews={product.reviews}
              image={product.image_url || ''}
              category={product.category}
              discount_price={product.discount_price}
              onDiscountUpdate={loadProducts}
            />
          ))}
        </div>
      )}
    </div>
  )
}
