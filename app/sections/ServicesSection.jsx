"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("body");

const services = [
  {
    title: "Auto in- en verkoop",
    description:
      "Wij bieden betrouwbare voertuigen aan en nemen uw auto graag over.",
  },
  {
    title: "Auto Export-Import",
    description: "Wij regelen volledige RDW exportdocumenten en verzekering.",
    fullText: `RDW EXPORT DIENSTVERLENING

Als u uw auto wilt exporteren, dan dient de auto te worden uitgeschreven uit het Nederlands kentekenregister. Bij Car Vision Epe regelen wij dat graag voor u!

Voertuig exporteren RDW
Om een auto voor u te kunnen exporteren dienen wij te beschikken over een aantal zaken. Alleen met deze documenten kunnen wij de auto officieel afmelden bij de RDW. Als de export is goedgekeurd bent u gevrijwaard van het betalen van wegenbelasting en uw verzekering.

De volgende zaken en documenten hebben wij nodig om te exporteren:
• Originele Nederlandse kentekenplaten
• Afgelezen kilometerstand van het voertuig
• Kentekenpapieren of kentekenkaart met tenaamstellingscodes
• Geldig legitimatiebewijs

Na export ontvangt u:
• Kentekenbewijs deel II
• Vrijwaringsbewijs

Als u rijdend het land wilt verlaten, kunnen wij tijdelijke verzekering + witte kentekenplaten verzorgen (14 dagen geldig, voertuig moet APK-gekeurd zijn).

Tarieven per 01-01-2023:
• Export papieren: €40
• SOC papieren: €75
• Export + verzekering + platen: €150

Voor meer informatie of afspraak: stuur ons een bericht.`,
  },
  {
    title: "Alle soorten reparaties",
    description: "Van motor tot elektronica – wij herstellen alles vakkundig.",
  },
  {
    title: "Schade afwikkeling en reparatie",
    description: "Volledige begeleiding bij schade en herstel.",
  },
  {
    title: "Autobandenafdeling",
    description: "Nieuwe banden, uitlijnen en advies op maat.",
  },
  {
    title: "Airco-service",
    description: "Onderhoud, bijvullen en reparatie van uw airco.",
  },
  {
    title: "Financiering",
    description: "Flexibele financieringsmogelijkheden voor uw aankoop.",
  },
];

export default function ServicesSection() {
  const [modalContent, setModalContent] = useState(null);

  return (
    <section
      id="services"
      className="relative z-10 bg-[#0f0f0f] text-white px-4 py-8 sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Onze Diensten</h2>
        <div className="w-40 h-1 bg-yellow-400 mx-auto mb-8" />
      </motion.div>

      <div className="max-w-6xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="bg-zinc-800 text-white rounded shadow p-4 w-full max-w-xs text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <h3 className="text-lg font-semibold mb-1">{service.title}</h3>
            <p className="text-sm text-gray-300">
              {service.fullText ? (
                <>
                  {service.description}
                  <button
                    className="ml-2 text-yellow-400 underline text-sm"
                    onClick={() => setModalContent(service.fullText)}
                  >
                    Lees meer
                  </button>
                </>
              ) : (
                service.description
              )}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Modal
        isOpen={!!modalContent}
        onRequestClose={() => setModalContent(null)}
        className="max-w-3xl bg-white dark:bg-zinc-900 p-6 rounded shadow-lg mx-auto my-20 relative text-black dark:text-white"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      >
        <button
          onClick={() => setModalContent(null)}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-800 dark:text-white"
          title="Sluiten"
        >
          ✕
        </button>
        <div className="whitespace-pre-wrap text-sm max-h-[75vh] overflow-y-auto">
          {modalContent}
        </div>
      </Modal>
    </section>
  );
}
