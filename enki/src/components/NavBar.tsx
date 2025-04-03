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
    <nav className="bg-gray-800/70 backdrop-filter backdrop-blur-sm text-white">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Enki
            </Link>
          </div>
          <div className="flex ml-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
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