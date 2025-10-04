'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import { ShoppingBag } from 'lucide-react'

export default function MisComprasPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mis Compras</h1>

        {/* Empty state */}
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Aún no tienes compras
          </h2>
          <p className="text-gray-600 mb-6">
            Explora nuestra colección y encuentra la obra de arte perfecta para ti
          </p>
          <button
            onClick={() => router.push('/tienda')}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors font-medium"
          >
            Explorar Tienda
          </button>
        </div>
      </div>
    </main>
  )
}

