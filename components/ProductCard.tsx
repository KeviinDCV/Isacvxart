'use client'

import { Star, Tag } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { updateProductDiscount } from '@/lib/products'
import { formatPriceCOP } from '@/lib/utils'
import ProductModal from './ProductModal'
import DiscountModal from './DiscountModal'

interface ProductCardProps {
  id: string
  name: string
  price: number
  rating: number
  reviews: number
  image: string
  category: string
  discount_price?: number | null
  onDiscountUpdate?: () => void
}

export default function ProductCard({
  id,
  name,
  price,
  rating,
  reviews,
  image,
  category,
  discount_price,
  onDiscountUpdate,
}: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false)
  const { addToCart } = useCart()
  const { isAdmin } = useAuth()

  // Usar precio con descuento si existe, sino el precio original
  const displayPrice = discount_price ?? price
  const hasDiscount = discount_price !== null && discount_price !== undefined

  const product = { 
    id, 
    name, 
    price: displayPrice, // El precio que se muestra es el que se usa para agregar al carrito
    image, 
    category 
  }

  const handleDiscountSave = async (discountPrice: number | null) => {
    await updateProductDiscount(id, discountPrice)
    if (onDiscountUpdate) {
      onDiscountUpdate()
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <>
      <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 group">
        {/* Imagen del producto */}
        <div 
          className="relative aspect-square bg-gray-100 overflow-hidden cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Badge de categoría */}
          <div className="absolute top-2 right-2 z-10 flex flex-col gap-2">
            <span className="bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium text-gray-700 border border-gray-200">
              {category}
            </span>
            {hasDiscount && (
              <span className="bg-red-500 text-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold">
                -{Math.round(((price - (discount_price || 0)) / price) * 100)}%
              </span>
            )}
          </div>
          
          {/* Botón de descuento para admin */}
          {isAdmin && (
            <div className="absolute top-2 left-2 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setIsDiscountModalOpen(true)
                }}
                className={`p-2 rounded-full ${
                  hasDiscount 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                } border border-gray-200 shadow-md transition-colors`}
                title={hasDiscount ? 'Editar descuento' : 'Agregar descuento'}
              >
                <Tag className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg sm:rounded-xl flex items-center justify-center">
              <span className="text-4xl sm:text-6xl text-gray-400">🎨</span>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div className="p-2.5 sm:p-4 md:p-5">
          <h3 
            className="text-xs sm:text-sm md:text-lg font-semibold text-gray-900 mb-1 sm:mb-2 line-clamp-2 cursor-pointer hover:text-gray-700 leading-tight"
            onClick={() => setIsModalOpen(true)}
          >
            {name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-2 mb-2 sm:mb-3">
            <div className="flex items-center gap-0.5 sm:gap-1">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 fill-gray-900 text-gray-900" />
              <span className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-900">{rating}</span>
            </div>
            <span className="text-[10px] sm:text-xs text-gray-500 hidden sm:inline">({reviews}k)</span>
          </div>

          {/* Precio */}
          <div className="mb-2 sm:mb-3">
            {hasDiscount ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                    {formatPriceCOP(discount_price || 0)}
                  </span>
                  <span className="text-xs sm:text-sm text-red-600 font-semibold">
                    -{Math.round(((price - (discount_price || 0)) / price) * 100)}%
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-gray-500 line-through">
                  {formatPriceCOP(price)}
                </span>
              </div>
            ) : (
              <span className="text-base sm:text-xl md:text-2xl font-bold text-gray-900">
                {formatPriceCOP(price)}
              </span>
            )}
          </div>

          {/* Botones - Diferentes en mobile vs desktop */}
          <div className="hidden sm:flex gap-2">
            <button 
              onClick={handleAddToCart}
              className="flex-1 py-2 md:py-3 px-2 md:px-4 border-2 border-gray-900 text-gray-900 rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-gray-900 hover:text-white transition-colors"
            >
              Agregar
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex-1 py-2 md:py-3 px-2 md:px-4 bg-gray-900 text-white rounded-lg md:rounded-xl text-xs md:text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Ver más
            </button>
          </div>

          {/* Botones mobile - Solo uno */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="sm:hidden w-full py-2 bg-gray-900 text-white rounded-lg text-xs font-medium hover:bg-gray-800 transition-colors active:scale-95"
          >
            Ver detalles
          </button>
        </div>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={{ ...product, rating, reviews }}
      />

      <DiscountModal
        isOpen={isDiscountModalOpen}
        onClose={() => setIsDiscountModalOpen(false)}
        onSave={handleDiscountSave}
        currentPrice={price}
        currentDiscountPrice={discount_price}
      />
    </>
  )
}

