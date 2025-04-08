"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (res.ok) {
      toast.success("Bericht succesvol verzonden!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      toast.error("Er ging iets mis. Probeer opnieuw.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-[#0f0f0f] text-white px-4 py-4 sm:px-6"
    >
      <Toaster position="top-center" />

      {/* 🔳 Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" />

      {/* 🔲 Overlay */}
      {/* <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" /> */}

      {/* ✨ Content */}
      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-yellow-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white border-b pb-2 border-yellow-400 dark:border-yellow-500">
          Contact
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto space-y-4 text-white"
        >
          <input
            type="text"
            placeholder="Naam"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a]/80 border border-yellow-400 text-white placeholder-white"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="E-mail"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a]/80 border border-yellow-400 text-white placeholder-white"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Bericht"
            className="w-full px-4 py-2 rounded bg-[#1a1a1a]/80 border border-yellow-400 text-white placeholder-white"
            rows={5}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-yellow-600 dark:bg-yellow-400 text-white dark:text-black px-6 py-2 rounded hover:bg-yellow-500 dark:hover:bg-yellow-300 transition"
            >
              Verstuur
            </button>
          </div>
        </form>

        {/* Contact Info */}
        <div className="text-center mt-8 text-yellow-100 text-sm space-y-1">
          <hr className="my-6 border-yellow-600 opacity-40" />

          <p
            onClick={() => {
              navigator.clipboard.writeText("Hazeldonk 6297, 4836LG Breda");
              alert("Adres gekopieerd naar klembord!");
            }}
            className="text-center font-bold cursor-pointer hover:text-yellow-300 transition"
          >
            📍 Hazeldonk 6297, 4836LG Breda (klik om te kopiëren)
          </p>
          <p>
            <strong>Openingstijden:</strong> Ma – Zo: 10:00 – 18:00
          </p>
          <p className="mt-6 text-center text-sm text-white">
            📧 Email ons via{" "}
            <a
              href="mailto:info@albazarauto.nl"
              className="text-yellow-400 underline"
            >
              info@albazarauto.nl
            </a>
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-6 mt-8 text-yellow-100 text-2xl">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/facebook-svgrepo-com.svg"
              alt="Facebook"
              className="w-7 h-7"
            />
          </a>
          <a
            href="https://www.instagram.com/albazar_auto_service?igsh=MTY5NzdoaWNtczNpbw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/icons8-instagram.svg"
              alt="Instagram"
              className="w-7 h-7"
            />
          </a>
          <a
            href="https://www.tiktok.com/@albazar.auto?_t=ZN-8vL2aZlN7LD&_r=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/tiktok.svg" alt="TikTok" className="w-7 h-7" />
          </a>
          <a
            href="https://wa.me/31642478920"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/whatsapp-social-media-svgrepo-com.svg"
              alt="WhatsApp"
              className="w-7 h-7"
            />
          </a>
          <a
            href="https://wa.me/31645060805"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/icons/whatsapp-social-media-svgrepo-com.svg"
              alt="WhatsApp"
              className="w-7 h-7"
            />
          </a>
          <a
            href="https://maps.app.goo.gl/3aPCaqepcUzYzvnC9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icons/maps.svg" alt="Locatie" className="w-7 h-7" />
          </a>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 text-sm text-yellow-400">
          © 2024{" "}
          <a
            href="https://kiwiit.de"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-yellow-300"
          >
            Kiwi IT
          </a>
          . All rights reserved.
        </footer>
      </motion.div>
    </section>
  );
}
