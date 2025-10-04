'use client'

import ProductCard from './ProductCard'

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
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Obras Destacadas
        </h2>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900">
          <option>Más Recientes</option>
          <option>Precio: Bajo a Alto</option>
          <option>Precio: Alto a Bajo</option>
          <option>Mejor Valorados</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  )
}

