// app/layout.js
"use client";
import "./globals.css";
import Navbar from "./components/Navbar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Hide navbar only for admin pages
    setShowNavbar(!pathname.startsWith("/admin"));
  }, [pathname]);

  return (
    <html lang="en">
      <body className="scroll-smooth bg-[#0f0f0f] text-white">
        {showNavbar && <Navbar />}
        <main className={showNavbar ? "pt-16" : ""}>{children}</main>
      </body>
    </html>
  );
}
