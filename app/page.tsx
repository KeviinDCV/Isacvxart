import Header from '@/components/Header'
import Hero from '@/components/Hero'
import CategorySidebar from '@/components/CategorySidebar'
import ProductGrid from '@/components/ProductGrid'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

