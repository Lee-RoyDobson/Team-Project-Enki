'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function LoginPage() {
  const router = useRouter()

  const handleGoToDashboard = () => {
    router.push('/student/dashboard')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-2xl font-bold">Login Page</h1>
      
      {/* Dashboard navigation button */}
      <button
        onClick={handleGoToDashboard}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Go to Student Dashboard
      </button>
    </div>
  )
}