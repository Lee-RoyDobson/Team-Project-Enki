'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Link from 'next/link'
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

    try {
      // TODO: Replace with actual authentication logic
      // Will currently just check if email and password are not empty
      if (email === 'instructor@unimail.derby.ac.uk' && password) {
        // Mock successful login for instructor
        setTimeout(() => {
          router.push('/instructor/dashboard')
        }, 1000)
      } else if (email && password) {
        // Mock successful login for student
        setTimeout(() => {
          router.push('/student/dashboard')
        }, 1000)
      } else {
        setError('Please enter both email and password')
        setIsLoading(false)
      }
    } catch (err) {
      setError('Failed to login. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4 relative overflow-hidden">
      {/* Particles background */}
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="you@unimail.derby.ac.uk"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Remember me
              </label>
            </div>
            
            <div className="text-sm">
              <Link href="/forgot-password" className="font-medium text-blue-400 hover:text-blue-300">
                Forgot your password?
              </Link>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:bg-blue-800 disabled:text-gray-300"
            >
              {isLoading ? 'Logging in...' : 'Log in'}
            </button>
          </div>
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