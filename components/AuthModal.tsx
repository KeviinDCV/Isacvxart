'use client'

import { X, Mail, Lock, User as UserIcon, Chrome } from 'lucide-react'
import { useState, FormEvent, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const { signIn, signUp, signInWithGoogle } = useAuth()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setMode(initialMode)
    } else {
      document.body.style.overflow = 'unset'
      // Reset form
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setError('')
      setSuccess('')
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, initialMode])

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden')
        setLoading(false)
        return
      }
      if (password.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres')
        setLoading(false)
        return
      }

      const { error } = await signUp(email, password)
      
      if (error) {
        setError(error.message)
      } else {
        setSuccess('¡Cuenta creada! Revisa tu email para verificar tu cuenta.')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      }
    } else {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError('Email o contraseña incorrectos')
      } else {
        onClose()
      }
    }

    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setLoading(true)
    const { error } = await signInWithGoogle()
    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl max-w-md w-full mx-4 shadow-2xl animate-scaleIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-3xl">♰</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'login' ? 'Bienvenido' : 'Crear Cuenta'}
            </h2>
            <p className="text-gray-600">
              {mode === 'login' 
                ? 'Inicia sesión para continuar' 
                : 'Únete a nuestra comunidad de arte'}
            </p>
          </div>

          {/* Mensajes */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-600">{success}</p>
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors mb-6"
          >
            <Chrome className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-700">
              Continuar con Google
            </span>
          </button>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">o continúa con email</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="••••••"
                />
              </div>
            </div>

            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="••••••"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {loading ? 'Procesando...' : mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
                setSuccess('')
              }}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {mode === 'login' ? (
                <>
                  ¿No tienes cuenta?{' '}
                  <span className="font-semibold">Regístrate</span>
                </>
              ) : (
                <>
                  ¿Ya tienes cuenta?{' '}
                  <span className="font-semibold">Inicia sesión</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

