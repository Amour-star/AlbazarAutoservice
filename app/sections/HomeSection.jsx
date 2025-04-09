"use client";
import { useState } from "react";
import Modal from "react-modal";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

Modal.setAppElement("body");

const content = {
  nl: {
    title: "Welkom bij Garagebedrijf Albazar",
    preview:
      "Door jaren in Breda actief te zijn in de verkoop en reparatie van automobielen heeft Garagebedrijf Albazar een gevestigde naam gekregen.",
    full: `Door jaren in Breda actief te zijn in de verkoop en reparatie van automobielen heeft Garagebedrijf Albazar een gevestigde naam in Breda gekregen.
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

Flexibiliteit – Eerlijkheid – Betrouwbaarheid dat zijn de sleutelwoorden van dit gezellige en professionele autobedrijf.`,
    button: "Lees meer",
    close: "Sluiten",
  },
  en: {
    title: "Welcome to Albazar Autoservice",
    preview:
      "Years of experience in Breda have made Albazar Autoservice a trusted name in car sales and repairs.",
    full: `Albazar Autoservice in Breda is a trusted family-run business specializing in vehicle sales, repairs, and customer service.

Our services include:
• Buying & Selling Vehicles
• Export & Import
• Full Repair Services
• Damage Claims & Repair
• Tire Department
• Air Conditioning Service
• Financing Options

Every detail is discussed beforehand to avoid surprises. Our core values: Flexibility – Honesty – Reliability.`,
    button: "Read more",
    close: "Close",
  },
  ar: {
    title: "مرحباً بكم في مركز البازار لخدمة السيارات",
    preview:
      "سنوات من الخبرة في بريدا جعلت من Albazar Autoservice اسماً موثوقاً في مجال السيارات.",
    full: `يعتبر Albazar Autoservice في بريدا مؤسسة عائلية موثوقة تقدم خدمات بيع السيارات، الصيانة، والإصلاحات.

تشمل خدماتنا:
• شراء وبيع السيارات
• التصدير والاستيراد
• جميع أنواع الإصلاحات
• معالجة الأضرار والتأمين
• قسم الإطارات
• خدمة التكييف
• خيارات التمويل

نناقش كل شيء مسبقًا لضمان الشفافية. قيمنا الأساسية: المرونة – الصدق – الموثوقية.`,
    button: "اقرأ المزيد",
    close: "إغلاق",
  },
};

export default function HomeSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const { language } = useLanguage();
  const { title, preview, full, button, close } = content[language];

  return (
    <section
      id="home"
      className={`relative bg-[#0f0f0f] text-white px-4 py-12 sm:px-6 ${
        language === "ar" ? "text-right" : "text-center"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
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
        className={`max-w-3xl bg-white dark:bg-zinc-900 p-6 rounded shadow-lg mx-auto my-20 relative text-black dark:text-white ${
          language === "ar" ? "text-right" : "text-left"
        }`}
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
