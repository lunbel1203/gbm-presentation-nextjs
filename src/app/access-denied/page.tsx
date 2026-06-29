'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Suspense } from 'react'

function AccessDeniedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') || 'unknown'

  const messages: Record<string, { title: string; description: string }> = {
    missing: {
      title: 'Token de Acceso Requerido',
      description: 'Necesitas un token de acceso válido para ver esta presentación. Por favor, contacta a GBM para recibir tu enlace personalizado.'
    },
    invalid: {
      title: 'Token de Acceso Inválido',
      description: 'El token de acceso proporcionado no es válido. Por favor, verifica tu enlace o contacta a GBM para asistencia.'
    },
    disabled: {
      title: 'Acceso Deshabilitado',
      description: 'Este token de acceso ha sido deshabilitado. Por favor, contacta a GBM para más información.'
    },
    expired: {
      title: 'Acceso Expirado',
      description: 'Tu token de acceso ha expirado. Por favor, contacta a GBM para solicitar un nuevo enlace.'
    },
    'not-started': {
      title: 'Acceso Aún No Disponible',
      description: 'Tu enlace de acceso todavía no está activo. Estará disponible a partir de la fecha de inicio indicada. Por favor, intenta más tarde o contacta a GBM.'
    },
    'wrong-language': {
      title: 'Enlace de Otra Versión',
      description: 'Este token corresponde a otra versión de la presentación. Por favor, verifica que estés usando el enlace correcto o contacta a GBM.'
    },
    'limit-reached': {
      title: 'Límite de Accesos Alcanzado',
      description: 'Este enlace alcanzó su número máximo de aperturas permitidas. Por favor, contacta a GBM para solicitar un nuevo acceso.'
    },
    error: {
      title: 'Error de Acceso',
      description: 'Ocurrió un error al validar tu acceso. Por favor, intenta nuevamente o contacta a GBM.'
    },
    unknown: {
      title: 'Acceso Denegado',
      description: 'No tienes permiso para ver este contenido.'
    }
  }

  const message = messages[reason] || messages.unknown

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#194263] to-[#0a2540] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
        {/* Logo */}
        <div className="mb-8">
          <Image
            src="/assets/images/logo-normal.png"
            alt="GBM Logo"
            width={250}
            height={80}
            className="mx-auto object-contain"
          />
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {message.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {message.description}
        </p>

        {/* Contact Info */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <p className="text-sm text-gray-700 mb-3 font-semibold">
            ¿Necesitas ayuda? Contáctanos:
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a
                href="mailto:contactus@glaringmaintenance.com"
                className="text-[#194263] hover:text-[#2d6a9f] underline"
              >
                contactus@glaringmaintenance.com
              </a>
            </p>
            <p>
              <span className="font-medium">Teléfono:</span>{' '}
              <a
                href="tel:+16175108382"
                className="text-[#194263] hover:text-[#2d6a9f] underline"
              >
                +1 (617) 510-8382
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          Tu Propiedad es Nuestra Prioridad
        </p>
      </div>
    </div>
  )
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#194263] to-[#0a2540] flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    }>
      <AccessDeniedContent />
    </Suspense>
  )
}