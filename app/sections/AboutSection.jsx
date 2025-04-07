"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

const previewText = `Albazar Autoservice is actief in Breda en omstreken. Met passie en expertise zorgen wij voor betrouwbare service en tevreden klanten.`;

const fullText = `Albazar Autoservice is actief in Breda en omstreken. Met passie en expertise zorgen wij voor betrouwbare service en tevreden klanten.

Onze kernwaarden:
• Eerlijk advies
• Betrouwbare reparaties
• Persoonlijke service
• Heldere communicatie

Wij zijn trots op ons team van ervaren monteurs en klantgerichte medewerkers. Elk voertuig behandelen wij alsof het ons eigen is. Kom gerust langs voor een kop koffie en een goed gesprek over uw auto.`;

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      id="about"
      className="w-full bg-[#0f0f0f] text-white px-4 py-8 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Over Ons</h2>
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
