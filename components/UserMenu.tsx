'use client'

import { User, LogOut, ShoppingBag, Settings } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import AuthModal from './AuthModal'
import Link from 'next/link'

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user, signOut, loading } = useAuth()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleSignOut = async () => {
    await signOut()
    setIsOpen(false)
  }

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode)
    setIsAuthModalOpen(true)
  }

  if (loading) {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
    )
  }

  if (!user) {
    return (
      <>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => openAuthModal('login')}
            className="hidden sm:inline-flex px-2 sm:px-3 py-1.5 sm:py-2 text-sm text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Iniciar
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className="px-2 sm:px-4 py-1.5 sm:py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-[11px] sm:text-sm whitespace-nowrap"
          >
            <span className="hidden xs:inline">Registrarse</span>
            <span className="xs:hidden">Entrar</span>
          </button>
        </div>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
      </>
    )
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black rounded-full transition-colors flex items-center justify-center"
          aria-label="Menú de usuario"
        >
          <User className="w-5 h-5 text-white" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 animate-scaleIn">
            {/* User info */}
            <div className="px-4 py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                {user.email}
              </p>
              {user.user_metadata?.full_name && (
                <p className="text-xs text-gray-500 mt-1">
                  {user.user_metadata.full_name}
                </p>
              )}
              {!user.email_confirmed_at && (
                <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                  ⚠️ Email no verificado
                </p>
              )}
            </div>

            {/* Menu items */}
            <div className="py-2">
              <Link
                href="/perfil"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Mi Perfil</span>
              </Link>
              <Link
                href="/mis-compras"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">Mis Compras</span>
              </Link>
            </div>

            {/* Sign out */}
            <div className="border-t border-gray-200 pt-2">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4 text-red-600" />
                <span className="text-sm text-red-600 font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

