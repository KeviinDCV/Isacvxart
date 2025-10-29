'use client'

import { X } from 'lucide-react'
import { useState, FormEvent, useEffect } from 'react'
import { formatPriceCOP } from '@/lib/utils'

interface DiscountModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (discountPrice: number | null) => Promise<void>
  currentPrice: number
  currentDiscountPrice?: number | null
}

export default function DiscountModal({
  isOpen,
  onClose,
  onSave,
  currentPrice,
  currentDiscountPrice,
}: DiscountModalProps) {
  const [discountPrice, setDiscountPrice] = useState<string>(
    currentDiscountPrice?.toString() || ''
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setDiscountPrice(currentDiscountPrice?.toString() || '')
      setError('')
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, currentDiscountPrice])

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!discountPrice.trim()) {
        // Eliminar descuento
        await onSave(null)
        onClose()
        return
      }

      const price = parseFloat(discountPrice)
      
      if (isNaN(price) || price <= 0) {
        setError('El precio debe ser un número mayor a 0')
        return
      }

      if (price >= currentPrice) {
        setError(`El precio con descuento debe ser menor al precio original (${formatPriceCOP(currentPrice)})`)
        return
      }

      await onSave(price)
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error al guardar el descuento')
    } finally {
      setLoading(false)
    }
  }

  const calculateDiscount = () => {
    if (!discountPrice.trim()) return ''
    const price = parseFloat(discountPrice)
    if (isNaN(price) || price <= 0) return ''
    const discount = ((currentPrice - price) / currentPrice) * 100
    return discount.toFixed(0)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-md w-full mx-4 shadow-2xl animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {currentDiscountPrice ? 'Editar Descuento' : 'Agregar Descuento'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Precio original:</p>
            <p className="text-2xl font-bold text-gray-900">{formatPriceCOP(currentPrice)}</p>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Precio con descuento *
            </label>
            <input
              type="number"
              step="0.01"
              min="0"
              max={currentPrice - 0.01}
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              placeholder={`Ej: ${formatPriceCOP(currentPrice * 0.8, { showCurrency: false })}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              required={!currentDiscountPrice}
            />
            {discountPrice && !isNaN(parseFloat(discountPrice)) && parseFloat(discountPrice) > 0 && (
              <p className="mt-2 text-sm text-gray-600">
                Descuento: <span className="font-bold text-red-600">-{calculateDiscount()}%</span>
              </p>
            )}
          </div>

          {currentDiscountPrice && (
            <div className="mb-4 p-3 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={async () => {
                  try {
                    await onSave(null)
                    onClose()
                  } catch (err) {
                    setError('Error al eliminar el descuento')
                  }
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Eliminar descuento
              </button>
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

