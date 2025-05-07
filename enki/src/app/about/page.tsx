"use client";

import Link from "next/link";
import ParticlesBackground from '@/components/ParticlesBackground';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">

      <ParticlesBackground />
      
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center z-10 relative max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          About Enki
        </h1>
        
        <div className="text-lg text-gray-300 space-y-6">
          <p>
            University of Derby - Team Project - 2025
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-2">Our Mission</h2>
          <p>
            Lorum ipsum dolor sit amet, consectetur adipiscing elit. 
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-2">Our Team</h2>
          <p>
            Lee-Roy Dobson, Hayden Hefford and Liam Hefford
          </p>
          
          <div className="mt-8">
            <Link href="/">
              <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg cursor-pointer">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-sm text-gray-400 z-10">
        &copy; {new Date().getFullYear()} University of Derby - Team Project - Enki
      </footer>
    </div>
  );
}