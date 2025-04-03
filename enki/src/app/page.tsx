"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function Home() {
  // State to control particle rendering
  const [isClient, setIsClient] = useState(false);
  // State to control fade-in animation
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    // Add a small delay before starting the fade-in
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: any) => {
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-b from-gray-900 to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        {isClient && (
          <div 
            className={`transition-opacity duration-1500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <Particles
              id="tsparticles"
              init={particlesInit}
              loaded={particlesLoaded}
              options={{
                background: {
                  color: {
                    value: "transparent",
                  },
                },
                fpsLimit: 120,
                interactivity: {
                  events: {
                    onClick: {
                      enable: false, // Disabled click interaction
                    },
                    onHover: {
                      enable: false, // Disabled hover interaction
                    },
                    resize: true,
                  },
                },
                particles: {
                  color: {
                    value: "#4F46E5",
                  },
                  links: {
                    color: "#4F46E5",
                    distance: 150,
                    enable: true,
                    opacity: 0.7,
                    width: 1.5,
                  },
                  collisions: {
                    enable: true,
                  },
                  move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                      default: "bounce",
                    },
                    random: false,
                    speed: 1,
                    straight: false,
                  },
                  number: {
                    density: {
                      enable: true,
                      area: 600,
                    },
                    value: 100,
                  },
                  opacity: {
                    value: 0.7,
                  },
                  shape: {
                    type: "circle",
                  },
                  size: {
                    value: { min: 1, max: 6 },
                  },
                },
                detectRetina: true,
              }}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        )}
      </div>
      
      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center z-10 relative">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Enki
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-md">
          Welcome to Enki.
        </p>
        
        <div className="mt-8">
          <Link href="/login">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-sm text-gray-400 z-10">
        &copy; {new Date().getFullYear()} University of Derby - Team Project - Enki
      </footer>
    </div>
  );
}
