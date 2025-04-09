"use client";
import { useLanguage } from "../context/LanguageContext";
import servicesData from "../constants/servicesData";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const { language } = useLanguage();
  const services = servicesData[language];

  const sectionTitle = {
    en: "Our Services",
    nl: "Onze Diensten",
    ar: "خدماتنا",
  };

  return (
    <section
      id="services"
      className={`relative bg-[#0f0f0f] text-white px-4 py-12 sm:px-6 ${
        language === "ar" ? "text-right" : "text-left"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">
          {sectionTitle[language]}
        </h2>
        <div className="w-40 h-1 bg-yellow-400 mx-auto mb-10" />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-zinc-900 p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2 flex items-center justify-between">
                <span className={`${language === "ar" ? "ml-2" : "mr-2"}`}>
                  {service.title}
                </span>
                <CheckCircle className="text-yellow-400 w-5 h-5" />
              </h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
