"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";
import { useLanguage } from "../context/LanguageContext";

Modal.setAppElement("body");

const aboutContent = {
  nl: {
    title: "Over Ons",
    preview:
      "Albazar Autoservice is actief in Breda en omstreken. Met passie en expertise zorgen wij voor betrouwbare service en tevreden klanten.",
    full: `Albazar Autoservice is actief in Breda en omstreken. Met passie en expertise zorgen wij voor betrouwbare service en tevreden klanten.

Onze kernwaarden:
• Eerlijk advies
• Betrouwbare reparaties
• Persoonlijke service
• Heldere communicatie

Wij zijn trots op ons team van ervaren monteurs en klantgerichte medewerkers. Elk voertuig behandelen wij alsof het ons eigen is. Kom gerust langs voor een kop koffie en een goed gesprek over uw auto.`,
    button: "Lees meer",
    close: "Sluiten",
  },
  en: {
    title: "About Us",
    preview:
      "Albazar Autoservice operates in Breda and the surrounding area. With passion and expertise, we provide reliable service and satisfied customers.",
    full: `Albazar Autoservice operates in Breda and the surrounding area. With passion and expertise, we provide reliable service and satisfied customers.

Our core values:
• Honest advice
• Reliable repairs
• Personal service
• Clear communication

We take pride in our team of skilled mechanics and customer-focused staff. Every vehicle is treated as if it were our own. Feel free to drop by for a coffee and a friendly chat about your car.`,
    button: "Read more",
    close: "Close",
  },
  ar: {
    title: "من نحن",
    preview:
      "تعمل خدمة Albazar Autoservice في بريدا والمناطق المحيطة بها. بشغف وخبرة، نقدم خدمة موثوقة ورضا للعملاء.",
    full: `تعمل خدمة Albazar Autoservice في بريدا والمناطق المحيطة بها. بشغف وخبرة، نقدم خدمة موثوقة ورضا للعملاء.

قيمنا الأساسية:
• نصائح صادقة
• إصلاحات موثوقة
• خدمة شخصية
• تواصل واضح

نحن فخورون بفريقنا من الميكانيكيين ذوي الخبرة وطاقم العمل الموجه نحو خدمة العملاء. نتعامل مع كل مركبة وكأنها ملك لنا. لا تتردد في زيارتنا لتناول فنجان من القهوة وحديث ودّي عن سيارتك.`,
    button: "اقرأ المزيد",
    close: "إغلاق",
  },
};

export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { language } = useLanguage();
  const { title, preview, full, button, close } = aboutContent[language];

  return (
    <section
      id="about"
      className={`w-full bg-[#0f0f0f] text-white px-4 py-8 sm:px-6 ${
        language === "ar" ? "text-right" : "text-center"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <div className="w-40 h-1 bg-yellow-400 mx-auto mb-6" />
        <p className="text-lg mb-4">{preview}</p>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition"
        >
          {button}
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
          className={`absolute top-4 ${
            language === "ar" ? "left-4" : "right-4"
          } text-2xl text-gray-600 hover:text-gray-800 dark:text-white`}
          title={close}
        >
          ✕
        </button>
        <div className="whitespace-pre-wrap text-sm max-h-[75vh] overflow-y-auto">
          {full}
        </div>
      </Modal>
    </section>
  );
}
