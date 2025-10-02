'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log el error a un servicio de monitoreo
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">Something went wrong!</h2>
        <p className="mb-6 text-gray-600">
          We apologize for the inconvenience. Please try again.
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
