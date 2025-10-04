'use client'

import { Home, Palette, Image, Sparkles, TrendingUp, Tag, BadgePercent } from 'lucide-react'
import { useState } from 'react'

const categories = [
  { id: 'all', name: 'Todos los Productos', icon: Home, count: 52 },
  { id: 'digital', name: 'Arte Digital', icon: Image, count: 18 },
  { id: 'ilustraciones', name: 'Ilustraciones', icon: Palette, count: 24 },
  { id: 'abstracto', name: 'Arte Abstracto', icon: Sparkles, count: 12 },
  { id: 'retratos', name: 'Retratos', icon: Image, count: 8 },
]

const filters = [
  { id: 'new', name: 'Nuevos', icon: Sparkles },
  { id: 'bestseller', name: 'Más Vendidos', icon: TrendingUp },
  { id: 'discount', name: 'En Descuento', icon: BadgePercent },
]

export default function CategorySidebar() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

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
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="flex-1 text-left text-sm font-medium">
                {category.name}
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-white text-gray-900'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Filtros */}
      <div className="border-t border-gray-200 pt-6">
        {filters.map((filter) => {
          const Icon = filter.icon
          const isSelected = selectedFilters.includes(filter.id)
          return (
            <button
              key={filter.id}
              onClick={() => toggleFilter(filter.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors mb-2 ${
                isSelected
                  ? 'bg-gray-100 text-gray-900'
                  : 'hover:bg-gray-50 text-gray-600'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                isSelected ? 'bg-gray-900 border-gray-900' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

