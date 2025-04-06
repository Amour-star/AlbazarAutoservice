'use client';
import { motion } from 'framer-motion';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative px-4 sm:px-6 py-12 overflow-hidden"
    >
      {/* 🔳 Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/images/garage-bg.jpg")' }}
      />

      {/* 🔲 Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      {/* ✨ Content */}
      <motion.div
        className="relative z-20 max-w-3xl mx-auto text-center text-yellow-100"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-4 text-yellow-400 border-b pb-2 border-yellow-400 dark:border-yellow-500">
          Over Ons
        </h2>
        <p className="text-lg leading-relaxed">
          Albazar Autoservice is actief in Breda en omstreken. Met passie en expertise zorgen wij
          voor betrouwbare service en tevreden klanten. Wij streven naar kwaliteit, persoonlijke aandacht
          en langdurige klantrelaties.
        </p>
      </motion.div>
    </section>
  );
}
