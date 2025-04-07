"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

const previewText = `Door jaren in Breda actief te zijn in de verkoop en reparatie van automobielen heeft Garagebedrijf Albazar een gevestigde naam gekregen.`;

const fullText = `Door jaren in Breda actief te zijn in de verkoop en reparatie van automobielen heeft Garagebedrijf Albazar een gevestigde naam in Breda gekregen.
Dit gezellige familiebedrijf aan Hazeldonk 6297 4836LG Breda straalt vertrouwen en kennis uit, u krijgt hier absoluut een goed gevoel als u bij hun terecht komt voor reparatie, advies of een ander automobiel.

Hier een opsomming waarmee u terecht kunt bij Garagebedrijf Albazar Autoservice te Breda:

• Auto in- en verkoop
• Auto Export-Import
• Alle soorten reparaties
• Schade afwikkeling en reparatie
• Autobandenafdeling
• Airco-service
• Financiering

Dit alles wordt van te voren duidelijk met u besproken en overlegd, eerst een goed advies, dan een prijsopgaaf zodat u nooit voor nare verrassingen komt te staan.

Flexibiliteit – Eerlijkheid – Betrouwbaarheid dat zijn de sleutelwoorden van dit gezellige en professionele autobedrijf.`;

export default function HomeSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="home"
      className="relative bg-[#0f0f0f] text-white px-4 py-12 sm:px-6"
    >
      {/* Background Overlay (if any) */}
      {/* <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" style={{ backgroundImage: 'url(/your-bg.jpg)' }} /> */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        <h1 className="text-3xl font-bold mb-4">
          Welkom bij Garagebedrijf Albazar
        </h1>
        <div className="w-40 h-1 bg-yellow-400 mx-auto mb-6" />
        <p className="text-lg mb-4">{previewText}</p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          Lees meer
        </button>
      </motion.div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        className="max-w-3xl bg-white dark:bg-zinc-900 p-6 rounded shadow-lg mx-auto my-20 relative text-black dark:text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <button
          onClick={() => setModalOpen(false)}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-white"
          title="Sluiten"
        >
          ✕
        </button>
        <div className="whitespace-pre-wrap text-sm max-h-[75vh] overflow-y-auto">
          {fullText}
        </div>
      </Modal>
    </section>
  );
}
