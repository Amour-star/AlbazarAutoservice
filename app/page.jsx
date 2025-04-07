"use client";
import { useScrollSpy } from "./hooks/useScrollSpy";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import HomeSection from "./sections/HomeSection";
import ServicesSection from "./sections/ServicesSection";
import AutosSection from "./sections/AutosSection";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";

const sectionIds = ["home", "services", "autos", "about", "contact"];

export default function HomePage() {
  const activeId = useScrollSpy(sectionIds, 100);

  return (
    <div className="scroll-smooth">
      <Navbar activeId={activeId} />
      <HomeSection />
      <ServicesSection />
      <AutosSection />
      <AboutSection />
      <ContactSection />
      <BackToTopButton />
    </div>
  );
}

function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-emerald-700 z-50"
    >
      ↑ Top
    </button>
  );
}
