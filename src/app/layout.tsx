"use client"; // Required for state and effects

import { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Moon, Sun } from "lucide-react";
import "./globals.css"; // Import global styles
import DarkModeToggle from "@/components/DarkModeToggle";

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
      {/* ✅ Make sure the parent container allows absolute positioning */}
      <div className="relative min-h-screen">
        {/* ✅ Fixed Header Position */}
        <header className="fixed top-4 right-4 z-50">
  <DarkModeToggle />
</header>


        {/* ✅ Ensure content doesn't get covered */}
        <main className="main-content">{children}</main>
      </div>
    </body>
  </html>
  );
}
