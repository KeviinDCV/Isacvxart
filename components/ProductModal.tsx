'use client'

import { X, Star, ShoppingCart } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { formatPriceCOP } from '@/lib/utils'
import type { Product } from '@/context/CartContext'

interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product & { rating: number; reviews: number }
}

export default function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const { addToCart } = useCart()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleAddToCart = () => {
    addToCart(product)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Imagen */}
          <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center">
              <span className="text-9xl">🎨</span>
            </div>
          </div>

          {/* Información */}
          <div className="flex flex-col">
            <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4 w-fit">
              {product.category}
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-medium text-gray-900">{product.rating}</span>
              <span className="text-gray-500">({product.reviews}k reseñas)</span>
            </div>

            {/* Precio */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-gray-900">{formatPriceCOP(product.price)}</span>
            </div>

            {/* Descripción */}
            <div className="mb-8 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                Esta es una obra de arte digital única y original. Perfecta para decorar tu hogar u oficina. 
                Alta resolución, lista para imprimir. Cada pieza es cuidadosamente creada por artistas talentosos.
              </p>
              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                  <span>Formato: JPG de alta resolución</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                  <span>Tamaño: 4000 x 4000 px</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
                  <span>Descarga inmediata</span>
                </div>
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 border-2 border-gray-900 text-gray-900 rounded-xl font-medium hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Agregar al Carrito
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                Comprar Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

