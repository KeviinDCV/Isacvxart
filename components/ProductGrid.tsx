'use client'

import ProductCard from './ProductCard'
import { useSearch } from '@/context/SearchContext'
import { useMemo, useEffect, useState } from 'react'
import { getProducts, type Product } from '@/lib/products'

export default function ProductGrid() {
  const { searchTerm } = useSearch()
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

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products

    const term = searchTerm.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    )
  }, [searchTerm, products])

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
            {searchTerm ? 'Intenta con otros términos de búsqueda' : 'No hay productos disponibles'}
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
            />
          ))}
        </div>
      )}
    </div>
  )
}

