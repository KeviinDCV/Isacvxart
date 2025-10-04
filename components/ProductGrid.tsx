'use client'

import ProductCard from './ProductCard'
import { useSearch } from '@/context/SearchContext'
import { useMemo } from 'react'

const products = [
  {
    id: '1',
    name: 'Paisaje Abstracto Digital',
    price: 29.90,
    rating: 5.0,
    reviews: 1.2,
    image: '/products/product1.jpg',
    category: 'Digital',
  },
  {
    id: '2',
    name: 'Retrato Minimalista',
    price: 12.00,
    rating: 5.0,
    reviews: 1.2,
    image: '/products/product2.jpg',
    category: 'Ilustración',
  },
  {
    id: '3',
    name: 'Arte Conceptual Moderno',
    price: 29.90,
    rating: 4.4,
    reviews: 1,
    image: '/products/product3.jpg',
    category: 'Digital',
  },
  {
    id: '4',
    name: 'Ilustración Botánica',
    price: 50.00,
    rating: 4.8,
    reviews: 1.2,
    image: '/products/product4.jpg',
    category: 'Ilustración',
  },
  {
    id: '5',
    name: 'Composición Geométrica',
    price: 9.90,
    rating: 5.0,
    reviews: 1.2,
    image: '/products/product5.jpg',
    category: 'Abstracto',
  },
  {
    id: '6',
    name: 'Arte Digital Premium',
    price: 34.10,
    rating: 4.8,
    reviews: 2.4,
    image: '/products/product6.jpg',
    category: 'Digital',
  },
  {
    id: '7',
    name: 'Ilustración Narrativa',
    price: 45.00,
    rating: 4.9,
    reviews: 0.8,
    image: '/products/product7.jpg',
    category: 'Ilustración',
  },
  {
    id: '8',
    name: 'Serie Abstracta Vol. 1',
    price: 19.90,
    rating: 4.7,
    reviews: 1.5,
    image: '/products/product8.jpg',
    category: 'Abstracto',
  },
  {
    id: '9',
    name: 'Retrato Expresivo',
    price: 39.00,
    rating: 5.0,
    reviews: 2.1,
    image: '/products/product9.jpg',
    category: 'Retrato',
  },
]

export default function ProductGrid() {
  const { searchTerm } = useSearch()

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products

    const term = searchTerm.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    )
  }, [searchTerm])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
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
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>Más Recientes</option>
          <option>Precio: Bajo a Alto</option>
          <option>Precio: Alto a Bajo</option>
          <option>Mejor Valorados</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No se encontraron resultados
          </h3>
          <p className="text-gray-600">
            Intenta con otros términos de búsqueda
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}

