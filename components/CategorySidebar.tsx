'use client'

import { Home, Palette, Image, Sparkles, TrendingUp, BadgePercent } from 'lucide-react'
import { useEffect, useMemo } from 'react'
import { useFilter } from '@/context/FilterContext'
import { getProducts, type Product } from '@/lib/products'
import { useState } from 'react'

// Mapeo de categorías de la BD a las mostradas en UI
const categoryMap: Record<string, { name: string; icon: typeof Home }> = {
  'Digital': { name: 'Arte Digital', icon: Image },
  'Ilustración': { name: 'Ilustraciones', icon: Palette },
  'Abstracto': { name: 'Arte Abstracto', icon: Sparkles },
  'Retrato': { name: 'Retratos', icon: Image },
  'Paisaje': { name: 'Paisajes', icon: Image },
  'Otro': { name: 'Otros', icon: Sparkles },
}

const filters = [
  { id: 'new', name: 'Nuevos', icon: Sparkles },
  { id: 'bestseller', name: 'Más Vendidos', icon: TrendingUp },
  { id: 'discount', name: 'En Descuento', icon: BadgePercent },
]

export default function CategorySidebar() {
  const { selectedCategory, selectedFilters, setSelectedCategory, setSelectedFilters } = useFilter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    setLoading(true)
    const data = await getProducts()
    setProducts(data)
    setLoading(false)
  }

  // Calcular conteos de categorías desde los productos reales
  const categoriesWithCounts = useMemo(() => {
    // Obtener todas las categorías únicas de los productos
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)))
    
    // Crear categorías con conteos
    const categoryCounts = uniqueCategories.map(category => {
      const count = products.filter(p => p.category === category).length
      const mapped = categoryMap[category] || { name: category, icon: Sparkles }
      return {
        id: category.toLowerCase().replace(/[áéíóú]/g, (match) => {
          const map: Record<string, string> = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u' }
          return map[match] || match
        }),
        name: mapped.name,
        icon: mapped.icon,
        count,
        dbCategory: category, // Guardar la categoría original de la BD
      }
    })

    // Ordenar por nombre
    categoryCounts.sort((a, b) => a.name.localeCompare(b.name))

    // Agregar "Todos los Productos" al inicio
    return [
      {
        id: 'all',
        name: 'Todos los Productos',
        icon: Home,
        count: products.length,
        dbCategory: 'all',
      },
      ...categoryCounts,
    ]
  }, [products])

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200">
      <h2 className="text-lg font-bold text-gray-900 mb-4">Categoría</h2>

      {/* Categorías */}
      <div className="space-y-2 mb-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-sm text-gray-500">Cargando...</p>
          </div>
        ) : (
          categoriesWithCounts.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.dbCategory)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  selectedCategory === category.dbCategory
                    ? 'bg-gray-900 text-white'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left text-sm font-medium">
                  {category.name}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category.dbCategory
                    ? 'bg-white text-gray-900'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            )
          })
        )}
      </div>

      {/* Filtros */}
      <div className="border-t border-gray-200 pt-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Filtros</h2>
        {filters.map((filter) => {
          const Icon = filter.icon
          const isSelected = selectedFilters.includes(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                isSelected
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                isSelected ? 'bg-white border-white' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{filter.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
