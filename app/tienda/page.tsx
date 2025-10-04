import Header from '@/components/Header'
import CategorySidebar from '@/components/CategorySidebar'
import ProductGrid from '@/components/ProductGrid'

export default function TiendaPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tienda de Arte</h1>
          <p className="text-lg text-gray-600">
            Explora nuestra colección completa de obras digitales
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de categorías */}
          <aside className="lg:w-64 flex-shrink-0">
            <CategorySidebar />
          </aside>
          
          {/* Grid de productos */}
          <div className="flex-1">
            <ProductGrid />
          </div>
        </div>
      </div>
    </main>
  )
}

