import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Rutas públicas que no requieren token
const PUBLIC_PATHS = ['/access-denied', '/api/health']

export function middleware(request: NextRequest) {
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
    // Leer archivo de tokens
    const tokensPath = join(process.cwd(), 'data', 'tokens.json')
    const tokensData = JSON.parse(readFileSync(tokensPath, 'utf-8'))
    const tokenInfo = tokensData.tokens[token]

    // Validar si el token existe
    if (!tokenInfo) {
      return NextResponse.redirect(new URL('/access-denied?reason=invalid', request.url))
    }

    // Validar si el token está activo
    if (!tokenInfo.active) {
      return NextResponse.redirect(new URL('/access-denied?reason=disabled', request.url))
    }

    // Validar si el token ha expirado
    if (tokenInfo.expiresAt) {
      const expirationDate = new Date(tokenInfo.expiresAt)
      if (expirationDate < new Date()) {
        return NextResponse.redirect(new URL('/access-denied?reason=expired', request.url))
      }
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
