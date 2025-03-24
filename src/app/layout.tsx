"use client"; // Required for state and effects

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Moon, Sun } from "lucide-react";
import "./globals.css"; // Import global styles

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Load dark mode preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class dynamically
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <html lang="en" className={inter.className}>
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all">
        {/* ✅ Header with Dark Mode Toggle */}
        <header className="absolute top-4 right-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-800 hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
          >
            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-900" />}
          </button>
        </header>

        {/* ✅ Render Page Content */}
        <div className="min-h-screen flex flex-col">{children}</div>
      </body>
    </html>
  );
}
