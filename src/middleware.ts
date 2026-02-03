import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fs from 'fs/promises'
import { join } from 'path'

// Usar Node.js runtime para poder leer archivos
export const runtime = 'nodejs'

// Rutas públicas que no requieren token
const PUBLIC_PATHS = ['/access-denied', '/api/validate-token', '/api/health']

// Tipos para los tokens
interface TokenInfo {
  client: string
  active: boolean
  createdAt: string
  expiresAt: string | null
  notes: string
}

interface TokensData {
  tokens: Record<string, TokenInfo>
}

// Cache de tokens en memoria
let tokensCache: TokensData | null = null
let lastCacheTime = 0
const CACHE_TTL = 60000 // 1 minuto

async function getTokens(): Promise<TokensData> {
  const now = Date.now()

  // Si tenemos cache válido, usarlo
  if (tokensCache && (now - lastCacheTime) < CACHE_TTL) {
    return tokensCache
  }

  try {
    // Intentar leer desde variable de entorno primero
    if (process.env.ACCESS_TOKENS) {
      const parsedTokens = JSON.parse(process.env.ACCESS_TOKENS) as TokensData
      tokensCache = parsedTokens
      lastCacheTime = now
      return parsedTokens
    }

    // Si no hay variable de entorno, leer desde archivo
    const tokensPath = join(process.cwd(), 'data', 'tokens.json')
    const tokensData = JSON.parse(await fs.readFile(tokensPath, 'utf-8')) as TokensData
    tokensCache = tokensData
    lastCacheTime = now
    return tokensData
  } catch (error) {
    console.error('Error reading tokens:', error)
    return { tokens: {} }
  }
}

function validateToken(token: string, tokensData: TokensData): { valid: boolean; reason?: string } {
  const tokenInfo = tokensData.tokens[token]

  // Validar si el token existe
  if (!tokenInfo) {
    return { valid: false, reason: 'invalid' }
  }

  // Validar si el token está activo
  if (!tokenInfo.active) {
    return { valid: false, reason: 'disabled' }
  }

  // Validar si el token ha expirado
  if (tokenInfo.expiresAt) {
    const expirationDate = new Date(tokenInfo.expiresAt)
    if (expirationDate < new Date()) {
      return { valid: false, reason: 'expired' }
    }
  }

  // Token válido
  return { valid: true }
}

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
    // Validar token directamente sin hacer fetch
    const tokensData = await getTokens()
    const result = validateToken(token!, tokensData)

    // Si el token no es válido, redirigir con la razón correspondiente
    if (!result.valid) {
      const reason = result.reason || 'invalid'
      return NextResponse.redirect(new URL(`/access-denied?reason=${reason}`, request.url))
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
