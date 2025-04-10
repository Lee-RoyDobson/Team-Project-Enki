'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

export default function StudentDashboard() {
  const router = useRouter()

  const handleGoToChatTest = () => {
    router.push('/chat_test')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-6 text-2xl font-bold">Student Dashboard</h1>
      
      {/* Chat Test navigation button */}
      <button
        onClick={handleGoToChatTest}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 cursor-pointer"
      >
        Go to Chat Test
      </button>
    </div>
  )
}