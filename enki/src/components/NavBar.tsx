/**
 * NavBar Component
 *
 * Provides a responsive navigation bar with links to different parts of the application.
 * Features a client-side rendering approach to prevent hydration mismatches.
 */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Interface defining the structure of navigation items.
 */
interface NavItem {
  title: string;
  path: string;
}

/**
 * Renders the application's navigation bar with conditional styling for active links.
 * Uses client-side mounting state to prevent hydration mismatches in Next.js.
 */
const NavBar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by ensuring component is only rendered after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Navigation items for the left side of the navbar
  const leftNavItems: NavItem[] = [{ title: "About", path: "/about" }];

  // Navigation items for the right side of the navbar
  const rightNavItems: NavItem[] = [{ title: "Login", path: "/login" }];

  // Return a skeleton during server-side rendering to prevent hydration mismatch
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
            {/* Logo/Home link with animation effects */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 hover:from-purple-400 hover:to-blue-400 transition-all duration-500 ease-in-out hover:[text-shadow:0_0_10px_rgba(147,51,234,0.7),0_0_15px_rgba(79,70,229,0.5)] px-2 py-1"
              >
                Enki
              </Link>
            </div>
            <div className="text-gray-400 mx-3">|</div>
            {/* Left side navigation items */}
            <div className="flex">
              {leftNavItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                    pathname === item.path
                      ? "bg-gray-700/50"
                      : "hover:bg-gray-700/50"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side navigation items */}
          <div className="flex">
            {rightNavItems.map((item) => (
              <Link
                key={item.title}
                href={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition duration-150 ${
                  pathname === item.path
                    ? "bg-gray-700/50"
                    : "hover:bg-gray-700/50"
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
