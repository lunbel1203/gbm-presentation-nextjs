import { NextRequest, NextResponse } from 'next/server'

// Necesita el runtime de Node.js para variables de entorno y fetch server-side
export const runtime = 'nodejs'

// URL interna de Strapi (red Docker traefik-public). Configurable por entorno.
const STRAPI_URL = process.env.STRAPI_URL || 'http://gbm-strapi:1337'
// Secreto compartido con Strapi para proteger el endpoint de validación
const VALIDATION_SECRET = process.env.VALIDATION_SECRET || ''
// Idioma de ESTA presentación: 'rd' (español) o 'usa' (inglés)
const PRESENTATION_LANG = process.env.PRESENTATION_LANG || 'rd'

export async function POST(request: NextRequest) {
  try {
    const { token, ip, userAgent, log } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, reason: 'missing' })
    }

    const res = await fetch(`${STRAPI_URL}/api/access/validate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-secret': VALIDATION_SECRET,
      },
      body: JSON.stringify({
        token,
        ip: ip || null,
        userAgent: userAgent || '',
        log: log !== false,
        language: PRESENTATION_LANG,
      }),
      cache: 'no-store',
    })

    if (!res.ok) {
      console.error('Strapi validation responded with status:', res.status)
      return NextResponse.json({ valid: false, reason: 'error' })
    }

    const result = await res.json()
    return NextResponse.json(result)

  } catch (error) {
    console.error('Error validating token:', error)
    return NextResponse.json({ valid: false, reason: 'error' })
  }
}
