'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HomeSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="home" className="relative px-4 sm:px-6 py-12 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("/images/garage-bg.jpg")' }}
      />
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70 z-10" />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto text-yellow-100"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-4">
          Welkom bij Garagebedrijf Albazar Autoservice
        </h1>

        <p className="text-base md:text-lg mb-6 leading-relaxed">
          Door jaren actief te zijn in de verkoop en reparatie van auto’s heeft Garagebedrijf Albazar
          een gevestigde naam in Breda opgebouwd.
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden"
            >
              <p className="text-base md:text-lg mb-4 leading-relaxed">
                Dit gezellige familiebedrijf aan <strong>Hazeldonk 6297, 4836LG Breda</strong> straalt
                vertrouwen en kennis uit. U krijgt hier absoluut een goed gevoel als u bij ons terecht
                komt voor reparatie, advies of een andere auto.
              </p>
              <p className="text-base md:text-lg mb-4 leading-relaxed">
                <strong>Onze diensten:</strong><br />
                Auto in- en verkoop · Auto Export-Import · Alle soorten reparaties · Schadeherstel ·
                Autobanden · Airco-service · Financiering
              </p>
              <p className="text-base md:text-lg mb-4 leading-relaxed">
                Eerst goed advies, dan een prijsopgaaf — zodat u nooit voor verrassingen komt te staan.
              </p>
              <p className="text-base md:text-lg mb-6 leading-relaxed">
                <strong>Flexibiliteit – Eerlijkheid – Betrouwbaarheid</strong> zijn onze sleutelwoorden.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lees meer toggle */}
        <div className="mb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-yellow-300 hover:text-yellow-100 underline font-medium"
          >
            {expanded ? 'Lees minder' : 'Lees meer'}
          </button>
        </div>

        {/* CTA Button on its own line */}
        <div>
          <a
            href="#autos"
            className="inline-block bg-yellow-600 dark:bg-yellow-400 text-white dark:text-black font-semibold px-6 py-3 rounded hover:bg-yellow-700 dark:hover:bg-yellow-300 transition"
          >
            Bekijk onze auto’s
          </a>
        </div>
      </motion.div>
    </section>
  );
}
