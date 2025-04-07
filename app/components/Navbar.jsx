"use client";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Navbar({ activeId }) {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const links = ["home", "services", "autos", "about", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]/90 dark:bg-[#1a1a1a]/90 border-b border-yellow-700 backdrop-blur-sm transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Logo + Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 text-yellow-500 dark:text-yellow-300 text-xl font-bold"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-7 w-7 rounded-full object-cover"
          />
          Albazar Autoservice
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-bold">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={`transition-colors ${
                activeId === id
                  ? "text-yellow-300"
                  : "text-yellow-400 hover:text-yellow-200"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}

          {/* <button
            onClick={toggleDarkMode}
            className="text-yellow-400 hover:text-yellow-200"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-yellow-400 hover:text-yellow-200"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1a1a] px-6 pb-4 pt-2 text-yellow-200 space-y-2 font-bold">
          {links.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMobileOpen(false)}
              className={`block ${
                activeId === id ? "text-yellow-300" : "hover:text-yellow-100"
              }`}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
          {/* <button
            onClick={toggleDarkMode}
            className="text-yellow-300 hover:text-yellow-100 mt-2"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>*/}
        </div>
      )}
    </nav>
  );
}
