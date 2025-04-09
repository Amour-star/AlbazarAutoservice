"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const languageFlags = {
  en: "🇬🇧",
  nl: "🇳🇱",
  ar: "🇸🇦",
};

export default function Navbar({ activeId }) {
  const { language, setLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["home", "services", "autos", "about", "contact"];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 bg-[#1a1a1a]/90 border-b border-yellow-700 backdrop-blur-sm transition-shadow ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Logo + Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 text-yellow-500 text-xl font-bold"
        >
          <img
            src="/logo.jpg"
            alt="Logo"
            className="h-10 w-10 rounded-full object-cover"
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

          {/* Language Toggle */}
          <div className="relative">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-yellow-400 text-black font-bold px-2 py-1 rounded"
            >
              <option value="en">🇬🇧 English</option>
              <option value="nl">🇳🇱 Nederlands</option>
              <option value="ar">🇸🇦 العربية</option>
            </select>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Language Selector (Mobile) */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-yellow-400 text-black font-bold px-2 py-1 rounded"
          >
            <option value="en">🇬🇧</option>
            <option value="nl">🇳🇱</option>
            <option value="ar">🇸🇦</option>
          </select>
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
        </div>
      )}
    </nav>
  );
}
