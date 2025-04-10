'use client'

import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

export default function ParticlesBackground() {
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
                    enable: false,
                  },
                  onHover: {
                    enable: false,
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
                    area: 1200,
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
  );
}