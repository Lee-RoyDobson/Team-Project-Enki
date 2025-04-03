"use client";

import React from 'react';
import Link from 'next/link';

interface NavItem {
  title: string;
  path: string;
}

const NavBar: React.FC = () => {
  const navItems: NavItem[] = [
    { title: 'About', path: '/about' },
    { title: 'Login', path: '/login' },
  ];

  return (
    <nav className="bg-gray-800/30 backdrop-filter backdrop-blur-md border-b border-gray-700/30 shadow-lg text-white fixed w-full z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
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
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700/50 transition duration-150"
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