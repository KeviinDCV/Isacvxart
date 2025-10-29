'use client'

import { X, Upload, Image as ImageIcon } from 'lucide-react'
import { useEffect, useState, FormEvent, ChangeEvent } from 'react'
import { createProduct, updateProduct, type Product, type ProductFormData } from '@/lib/products'
import { uploadProductImage } from '@/lib/supabase'

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product?: Product | null
}

export default function ProductFormModal({ isOpen, onClose, product }: ProductFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    price: 0,
    category: 'Digital',
    description: '',
    image_url: '',
    stock: 0,
    active: true,
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description || '',
        image_url: product.image_url || '',
        stock: product.stock,
        active: product.active,
      })
      setPreviewUrl(product.image_url || '')
    } else {
      setFormData({
        name: '',
        price: 0,
        category: 'Digital',
        description: '',
        image_url: '',
        stock: 0,
        active: true,
      })
      setPreviewUrl('')
    }
    setError('')
    setSelectedFile(null)
  }, [product, isOpen])

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Por favor selecciona una imagen válida')
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('La imagen no debe superar 5MB')
        return
      }
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError('')
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let imageUrl = formData.image_url

      // Si hay una nueva imagen, subirla primero
      if (selectedFile) {
        setUploading(true)
        const uploadedUrl = await uploadProductImage(selectedFile)
        setUploading(false)
        
        if (!uploadedUrl) {
          throw new Error('Error al subir la imagen')
        }
        imageUrl = uploadedUrl
      }

      const dataToSave = { ...formData, image_url: imageUrl }

      if (product) {
        await updateProduct(product.id, dataToSave)
      } else {
        await createProduct(dataToSave)
      }
      onClose()
    } catch (err: any) {
      setError(err.message || 'Error al guardar el producto')
    } finally {
      setLoading(false)
      setUploading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-scaleIn max-h-[90vh] overflow-y-auto mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {product ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <p className="text-gray-600">
              {product ? 'Actualiza la información del producto' : 'Completa los datos para crear un nuevo producto'}
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                placeholder="Ej: Paisaje Abstracto Digital"
              />
            </div>

            {/* Precio y Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (COP) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="29.90"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock (unidades) *
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="10"
                />
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                <option value="Digital">Digital</option>
                <option value="Ilustración">Ilustración</option>
                <option value="Abstracto">Abstracto</option>
                <option value="Retrato">Retrato</option>
                <option value="Paisaje">Paisaje</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                placeholder="Describe el producto..."
              />
            </div>

            {/* Subir imagen */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen del Producto
              </label>
              
              {/* Preview de imagen */}
              {previewUrl && (
                <div className="mb-3 relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl('')
                      setSelectedFile(null)
                      setFormData({ ...formData, image_url: '' })
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Input de archivo */}
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-gray-400 transition-colors cursor-pointer"
                >
                  {uploading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
                      <span className="text-sm text-gray-600">Subiendo...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : 'Seleccionar imagen (máx. 5MB)'}
                      </span>
                    </>
                  )}
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {previewUrl ? 'Haz clic en la X para quitar la imagen' : 'Sube una imagen JPG, PNG o WebP'}
              </p>
            </div>

            {/* Estado activo */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-gray-900 border-gray-300 rounded focus:ring-2 focus:ring-gray-900"
              />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">
                Producto activo (visible en la tienda)
              </label>
            </div>

            {/* Botones */}
            <div className="flex gap-3 pt-4">
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
                className="flex-1 py-3 px-4 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {loading ? 'Guardando...' : product ? 'Actualizar' : 'Crear Producto'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

