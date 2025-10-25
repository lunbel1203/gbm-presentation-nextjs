'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AccessDeniedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') || 'unknown'

  const messages: Record<string, { title: string; description: string }> = {
    missing: {
      title: 'Token Requerido',
      description: 'No se proporcionó un token de acceso. Por favor, utiliza el enlace proporcionado por GBM.',
    },
    invalid: {
      title: 'Token Inválido',
      description: 'El token de acceso no es válido. Por favor, verifica el enlace proporcionado.',
    },
    expired: {
      title: 'Token Expirado',
      description: 'El token de acceso ha expirado. Por favor, contacta a GBM para obtener un nuevo enlace.',
    },
    disabled: {
      title: 'Acceso Deshabilitado',
      description: 'Este token de acceso ha sido deshabilitado. Por favor, contacta a GBM para más información.',
    },
    error: {
      title: 'Error de Validación',
      description: 'Ocurrió un error al validar tu acceso. Por favor, intenta nuevamente más tarde.',
    },
    unknown: {
      title: 'Acceso Denegado',
      description: 'No tienes permiso para acceder a este contenido.',
    },
  }

  const message = messages[reason] || messages.unknown

  return (
    <div className="min-h-screen bg-gradient-to-br from-gbm-blue to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center">
        <div className="mb-6">
          <svg
            className="mx-auto h-16 w-16 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {message.title}
        </h1>

        <p className="text-gray-600 mb-8">
          {message.description}
        </p>

        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Si crees que esto es un error, por favor contacta:
          </p>
          <a
            href="mailto:support@gbmcorp.com"
            className="inline-block bg-gbm-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Contactar Soporte
          </a>
        </div>
      </div>
    </div>
  )
}

export default function AccessDenied() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gbm-blue to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    }>
      <AccessDeniedContent />
    </Suspense>
  )
}