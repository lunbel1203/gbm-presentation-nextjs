'use client'

import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Suspense } from 'react'

function AccessDeniedContent() {
  const searchParams = useSearchParams()
  const reason = searchParams.get('reason') || 'unknown'

  const messages: Record<string, { title: string; description: string }> = {
    missing: {
      title: 'Access Token Required',
      description: 'You need a valid access token to view this presentation. Please contact GBM to receive your personalized link.'
    },
    invalid: {
      title: 'Invalid Access Token',
      description: 'The access token provided is not valid. Please verify your link or contact GBM for assistance.'
    },
    disabled: {
      title: 'Access Disabled',
      description: 'This access token has been disabled. Please contact GBM for more information.'
    },
    expired: {
      title: 'Access Expired',
      description: 'Your access token has expired. Please contact GBM to request a new link.'
    },
    error: {
      title: 'Access Error',
      description: 'An error occurred while validating your access. Please try again or contact GBM.'
    },
    unknown: {
      title: 'Access Denied',
      description: 'You do not have permission to view this content.'
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
            Need help? Contact us:
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Email:</span>{' '}
              <a
                href="mailto:info@glaringbm.com"
                className="text-[#194263] hover:text-[#2d6a9f] underline"
              >
                info@glaringbm.com
              </a>
            </p>
            <p>
              <span className="font-medium">Phone:</span>{' '}
              <a
                href="tel:+1234567890"
                className="text-[#194263] hover:text-[#2d6a9f] underline"
              >
                +1 (234) 567-890
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-400 mt-6">
          Your Property is Our Priority
        </p>
      </div>
    </div>
  )
}

export default function AccessDeniedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#194263] to-[#0a2540] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <AccessDeniedContent />
    </Suspense>
  )
}
