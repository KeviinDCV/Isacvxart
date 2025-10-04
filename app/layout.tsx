import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { SearchProvider } from '@/context/SearchContext'
import { AuthProvider } from '@/context/AuthContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Isacvxart - Galería de Arte Digital',
  description: 'Tienda de arte digital y dibujos originales',
  icons: {
    icon: '/images/logo.png',
    apple: '/images/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          <SearchProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </SearchProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

