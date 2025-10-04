'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import ProductModal from './ProductModal'

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
}

export default function ProductCard({
  id,
  name,
  price,
  rating,
  reviews,
  image,
  category,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  const product = { id, name, price, image, category }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
        {/* Imagen del producto */}
        <div 
          className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="absolute top-3 right-3 z-10">
            <span className="bg-white px-3 py-1 rounded-full text-xs font-medium text-gray-700 border border-gray-200">
              {category}
            </span>
          </div>
          <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
              <span className="text-6xl text-gray-400">🎨</span>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-5">
          <h3 
            className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 cursor-pointer hover:text-gray-700"
            onClick={() => setIsModalOpen(true)}
          >
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
              <span className="text-sm font-medium text-gray-900">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">({reviews}k Reviews)</span>
          </div>

          {/* Precio y acciones */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-gray-900">${price}</span>
          </div>

          {/* Botones */}
          <div className="flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 border-2 border-gray-900 text-gray-900 rounded-xl font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Agregar
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Ver más
            </button>
          </div>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ ...product, rating, reviews }}
      />
    </>
  )
}

