/**
 * Root Layout Component
 *
 * Provides the base HTML structure for all pages in the application.
 * Includes global fonts, navigation bar, and toast notifications.
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Configure Geist Sans font for primary text content.
 * Loads the font and makes it available via CSS variables.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Configure Geist Mono font for code blocks and monospaced text.
 * Loads the font and makes it available via CSS variables.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Define metadata for the application.
 * This information is used for SEO and browser tabs.
 */
export const metadata: Metadata = {
  title: "Enki",
  description: "Welcome to Enki.",
};

/**
 * Root layout component that wraps all pages.
 * Provides consistent structure, styling, and navigation.
 *
 * @param children - The page content to render
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Global navigation bar */}
        <NavBar />

        {/* Main content area */}
        <main>{children}</main>

        {/* Toast notification container */}
        <ToastContainer />
      </body>
    </html>
  );
}
