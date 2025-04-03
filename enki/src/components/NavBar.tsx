"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  title: string;
  path: string;
}

const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // Prevent hydration mismatch by ensuring component is only rendered after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  const leftNavItems: NavItem[] = [
    { title: 'About', path: '/about' },
  ];
  
  const rightNavItems: NavItem[] = [
    { title: 'Login', path: '/login' },
  ];

  // Return a skeleton or null during server-side rendering to prevent hydration mismatch
  if (!mounted) {
    return (
      <nav className="bg-gray-800/30 backdrop-filter backdrop-blur-md border-b border-gray-700/30 shadow-lg text-white fixed w-full z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-gray-800/30 backdrop-filter backdrop-blur-md border-b border-gray-700/30 shadow-lg text-white fixed w-full z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-purple-400 hover:to-blue-400 transition-all duration-500 ease-in-out hover:[text-shadow:0_0_10px_rgba(147,51,234,0.7),0_0_15px_rgba(79,70,229,0.5)] px-2 py-1"
              >
                Enki
              </Link>
            </div>
            <div className="text-gray-400 mx-3">|</div>
            <div className="flex">
              {leftNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                    pathname === item.path ? 'bg-gray-700/50' : 'hover:bg-gray-700/50'
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex">
            {rightNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                  pathname === item.path ? 'bg-gray-700/50' : 'hover:bg-gray-700/50'
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;