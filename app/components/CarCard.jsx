"use client";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";

export default function CarCard({ car }) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  const formatKm = (km) => {
    if (!km) return "";
    return km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " km";
  };

  return (
    <motion.div
      className="bg-white dark:bg-black shadow rounded-lg p-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={sliderRef}
        className="keen-slider aspect-video overflow-hidden rounded-lg mb-4"
      >
        {car.images.map((img, idx) => (
          <div key={idx} className="keen-slider__slide">
            <img
              src={img}
              alt={`${car.title} ${idx + 1}`}
              className="w-full h-full object-cover rounded"
            />
          </div>
        ))}
      </div>

      <h3 className="text-xl text-gray-500 font-semibold">{car.title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
        Merk: {car.brand}
      </p>
      <p className="text-lg font-bold text-green-500">
        {new Intl.NumberFormat("de-DE", {
          style: "currency",
          currency: "EUR",
        }).format(parseInt(car.price.replace(/[^\d]/g, "")) || 0)}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex flex-wrap gap-2 items-center">
        📅 {car.year} | ⛽ {car.fuel} | ⚙️ {car.transmission} | 🛣️{" "}
        {formatKm(car.kilometer)}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-1 flex flex-wrap gap-2 items-center">
        {car.description}
      </p>

      <a
        href={`https://wa.me/31642218646?text=${encodeURIComponent(
          `Hallo! Ik ben geïnteresseerd in de auto "${car.title}". Bekijk hier: https://albazarautoservice.nl#autos`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded transition"
      >
        <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-5 h-5" />
        WhatsApp over deze auto
      </a>
    </motion.div>
  );
}
