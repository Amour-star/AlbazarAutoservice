"use client";
import { useState, useMemo } from "react";
import { useKeenSlider } from "keen-slider/react";
import Modal from "react-modal";
import Zoom from "react-medium-image-zoom";
import "keen-slider/keen-slider.min.css";
import "react-medium-image-zoom/dist/styles.css";
import { FaWhatsapp } from "react-icons/fa";
export default function CarCard({ car }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const orderedImages = useMemo(() => {
    const reordered = [...car.images];
    if (car.mainImageIndex > 0) {
      const main = reordered.splice(car.mainImageIndex, 1);
      reordered.unshift(...main);
    }
    return reordered;
  }, [car.images, car.mainImageIndex]);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
  });

  return (
    <div className="flex justify-center w-full">
      <div className="bg-white dark:bg-zinc-800 text-black dark:text-white p-4 rounded shadow relative w-full max-w-sm">
        {/* Image Carousel */}
        <div className="relative">
          <div ref={sliderRef} className="keen-slider rounded overflow-hidden">
            {orderedImages.map((img, i) => (
              <div
                key={i}
                className="keen-slider__slide"
                onClick={() => setSelectedImage(img)}
              >
                <img
                  src={img}
                  alt={`car-${i}`}
                  className="w-full h-48 object-cover cursor-zoom-in"
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-2"
          >
            ‹
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black/40 hover:bg-black/70 rounded-full p-2"
          >
            ›
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center gap-2 mt-2">
          {orderedImages.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`thumb-${i}`}
              onClick={() => instanceRef.current?.moveToIdx(i)}
              className={`w-14 h-14 object-cover rounded cursor-pointer border-2 ${
                i === currentSlide ? "border-yellow-400" : "border-transparent"
              }`}
            />
          ))}
        </div>

        {/* Car Details */}
        <h3 className="text-xl font-bold mt-3">{car.title}</h3>
        <h3 className="text-xl font-bold mt-3">{car.title}</h3>
        <p className="text-green-600 font-semibold">
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
          }).format(car.price)}
        </p>

        <p className="text-sm">
          {car.year} • {car.kilometer} km
        </p>
        <p className="text-sm">
          {car.fuel} • {car.transmission}
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          {car.description}
        </p>

        {/* WhatsApp Contact */}
        <a
          href={`https://wa.me/31642478920?text=Hallo! Ik ben geïnteresseerd in de ${encodeURIComponent(
            car.title
          )} (${typeof window !== "undefined" ? window.location.href : ""})`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block bg-green-600 text-white px-4 py-2 rounded hover:opacity-80 transition"
        >
          <FaWhatsapp className="inline-block mr-2 text-white" />
          Contact via WhatsApp
        </a>

        {/* Image Zoom Modal */}
        <Modal
          isOpen={!!selectedImage}
          onRequestClose={() => setSelectedImage(null)}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75 z-40"
        >
          <div className="relative max-h-[90vh]">
            <Zoom>
              <img
                src={selectedImage}
                alt="Zoomed car"
                className="max-h-[90vh] max-w-full rounded shadow-xl cursor-zoom-out"
              />
            </Zoom>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-white bg-black/70 rounded-full p-2 text-lg hover:bg-black"
              title="Sluiten"
            >
              ✕
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
