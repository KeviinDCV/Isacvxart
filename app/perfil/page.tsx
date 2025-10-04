'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import Header from '@/components/Header'
import { Mail, Calendar, Shield, AlertCircle } from 'lucide-react'

export default function PerfilPage() {
  const { user, loading, resendVerificationEmail } = useAuth()
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

  const handleResendEmail = async () => {
    if (user.email) {
      const { error } = await resendVerificationEmail(user.email)
      if (error) {
        alert('Error al enviar email: ' + error.message)
      } else {
        alert('¡Email de verificación enviado! Revisa tu bandeja de entrada.')
      }
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Mi Perfil</h1>

        {/* Verificación de email */}
        {!user.email_confirmed_at && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-900 mb-1">
                Email no verificado
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                Por favor verifica tu email para acceder a todas las funcionalidades.
              </p>
              <button
                onClick={handleResendEmail}
                className="text-sm font-medium text-amber-900 hover:text-amber-700 underline"
              >
                Reenviar email de verificación
              </button>
            </div>
          </div>
        )}

        {/* Información de usuario */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Información Personal
          </h2>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Email
                </label>
                <p className="text-lg text-gray-900">{user.email}</p>
                {user.email_confirmed_at && (
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    Verificado
                  </p>
                )}
              </div>
            </div>

            {/* Fecha de registro */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-500 mb-1 block">
                  Miembro desde
                </label>
                <p className="text-lg text-gray-900">
                  {new Date(user.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            {/* Provider */}
            {user.app_metadata?.provider && (
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-500 mb-1 block">
                    Método de inicio de sesión
                  </label>
                  <p className="text-lg text-gray-900 capitalize">
                    {user.app_metadata.provider === 'email' ? 'Email/Contraseña' : user.app_metadata.provider}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
            <p className="text-sm text-gray-600">Compras realizadas</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">0</p>
            <p className="text-sm text-gray-600">Obras favoritas</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-gray-900 mb-2">$0.00</p>
            <p className="text-sm text-gray-600">Total gastado</p>
          </div>
        </div>
      </div>
    </main>
  )
}

