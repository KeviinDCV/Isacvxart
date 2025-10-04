import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    // El código se manejará automáticamente por Supabase en el cliente
    return NextResponse.redirect(new URL('/', requestUrl.origin))
  }

  // Si no hay código, redirigir al inicio
  return NextResponse.redirect(new URL('/', requestUrl.origin))
}

