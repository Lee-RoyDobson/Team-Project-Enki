"use client";

import Link from "next/link";
import ParticlesBackground from '@/components/ParticlesBackground';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Particles background */}
      <ParticlesBackground />
      
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center z-10 relative max-w-4xl">
        <h1 className="text-6xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
          About Enki
        </h1>
        
        <div className="text-lg text-gray-300 space-y-6">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies tincidunt, 
            nunc nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Enki is an innovative educational platform 
            designed to revolutionize the way students learn and engage with content.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-2">Our Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat odio sit amet quam 
            tincidunt, ac aliquam magna facilisis. Phasellus facilisis, justo non pulvinar tincidunt, 
            nisl lectus luctus libero, vitae varius nisl nisl sit amet nisl.
          </p>
          
          <h2 className="text-2xl font-semibold text-blue-300 mt-8 mb-2">Our Team</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat odio sit amet quam 
            tincidunt, ac aliquam magna facilisis. Phasellus facilisis, justo non pulvinar tincidunt, 
            nisl lectus luctus libero, vitae varius nisl nisl sit amet nisl.
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