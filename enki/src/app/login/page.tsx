'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import ParticlesBackground from '@/components/ParticlesBackground'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    setIsLoading(false)

    if (res?.error) {
      setError('Failed to login. Please check your credentials.')
    } else {
      router.push('/student/dashboard') // or wherever you want to redirect
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 relative overflow-hidden">
      <ParticlesBackground />
      <div className="w-full max-w-md rounded-lg bg-gray-800/50 backdrop-filter backdrop-blur-md border border-gray-700/30 p-8 shadow-lg z-10">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-100">Login to Enki</h1>
        {error && (
          <div className="mb-4 rounded-md bg-red-900/50 p-3 text-sm text-red-200 border border-red-700">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100" required />
          </div>
          <button type="submit" disabled={isLoading}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            {isLoading ? 'Logging in...' : 'Log in'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-gray-400">Don't have an account?</span>{' '}
          <Link href="/signup" className="font-medium text-blue-400 hover:text-blue-300">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}