import { NextRequest, NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ valid: false, reason: 'missing' })
    }

    // Leer archivo de tokens
    const tokensPath = join(process.cwd(), 'data', 'tokens.json')
    const tokensData = JSON.parse(readFileSync(tokensPath, 'utf-8'))
    const tokenInfo = tokensData.tokens[token]

    // Validar si el token existe
    if (!tokenInfo) {
      return NextResponse.json({ valid: false, reason: 'invalid' })
    }

    // Validar si el token está activo
    if (!tokenInfo.active) {
      return NextResponse.json({ valid: false, reason: 'disabled' })
    }

    // Validar si el token ha expirado
    if (tokenInfo.expiresAt) {
      const expirationDate = new Date(tokenInfo.expiresAt)
      if (expirationDate < new Date()) {
        return NextResponse.json({ valid: false, reason: 'expired' })
      }
    }

    // Token válido
    return NextResponse.json({ valid: true })

  } catch (error) {
    console.error('Error validating token:', error)
    return NextResponse.json({ valid: false, reason: 'error' })
  }
}
