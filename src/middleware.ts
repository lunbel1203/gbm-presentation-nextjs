import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Rutas públicas que no requieren token
const PUBLIC_PATHS = ['/access-denied', '/api/validate-token', '/api/health']

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl

  // Permitir acceso a rutas públicas
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
    return NextResponse.next()
  }

  // Permitir acceso a archivos estáticos
  if (pathname.startsWith('/_next') || pathname.startsWith('/assets')) {
    return NextResponse.next()
  }

  // Obtener token de la URL
  const token = searchParams.get('t') || searchParams.get('token')

  if (!token) {
    // Redirigir a página de acceso denegado si no hay token
    return NextResponse.redirect(new URL('/access-denied?reason=missing', request.url))
  }

  try {
    // Construir URL completa para la API de validación
    // Usar localhost en el contenedor Docker
    const protocol = request.nextUrl.protocol
    const host = request.headers.get('host') || 'localhost:3000'
    const apiUrl = `${protocol}//${host}/api/validate-token`

    console.log('Validating token via:', apiUrl)

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    if (!response.ok) {
      console.error('API response not OK:', response.status)
      return NextResponse.redirect(new URL('/access-denied?reason=error', request.url))
    }

    const result = await response.json()

    if (!result.valid) {
      return NextResponse.redirect(new URL(`/access-denied?reason=${result.reason}`, request.url))
    }

    // Token válido - permitir acceso
    return NextResponse.next()

  } catch (error) {
    console.error('Error validating token:', error)
    return NextResponse.redirect(new URL('/access-denied?reason=error', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
