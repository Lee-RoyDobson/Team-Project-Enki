"use client";

import { useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function Home() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#6366f1",
            },
            links: {
              color: "#6366f1",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
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
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 -z-10"
      />

      <main className="flex flex-col items-center justify-center gap-8 p-8 text-center z-10">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          Enki
        </h1>
        
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-md">
          Welcome to Enki.
        </p>
        
        <div className="mt-8">
          <Link href="/chat">
            <button className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 shadow-lg cursor-pointer">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      
      <footer className="absolute bottom-4 text-sm text-gray-500 dark:text-gray-400 z-10">
        &copy; {new Date().getFullYear()} University of Derby - Team Project - Enki
      </footer>
    </div>
  );
}
