"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";

export default function CarModal({ car, onClose }) {
  const [current, setCurrent] = useState(0);
  const images = Array.isArray(car.images) ? car.images : [];

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrent((c) => (c + 1) % images.length),
    onSwipedRight: () =>
      setCurrent((c) => (c - 1 + images.length) % images.length),
    trackMouse: true,
  });

  const prevImage = () =>
    setCurrent((c) => (c - 1 + images.length) % images.length);
  const nextImage = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4">
      <div className="relative bg-[#111] w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-lg shadow-lg text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-2xl bg-red-600 hover:bg-red-700 rounded-full w-8 h-8 flex items-center justify-center z-50"
        >
          &times;
        </button>

        {/* Carousel */}
        <div
          {...swipeHandlers}
          className="relative w-full h-72 sm:h-[400px] bg-black"
        >
          {images.length > 0 && (
            <img
              src={images[current]}
              alt={`Car ${current + 1}`}
              className="w-full h-full object-contain"
            />
          )}

          {/* Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/60 px-3 py-2 rounded-full"
              >
                ◀
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/60 px-3 py-2 rounded-full"
              >
                ▶
              </button>
            </>
          )}
        </div>

        {/* Car Info */}
        <div className="p-4 space-y-2 text-sm sm:text-base">
          <h2 className="text-xl font-bold text-yellow-400">{car.title}</h2>
          <p className="text-white">{car.description}</p>
          <div className="grid grid-cols-2 gap-3 text-gray-300">
            <p>
              <strong>Merk:</strong> {car.brand}
            </p>
            <p>
              <strong>Model:</strong> {car.model}
            </p>
            <p>
              <strong>Bouwjaar:</strong> {car.year}
            </p>
            <p>
              <strong>Brandstof:</strong> {car.fuel}
            </p>
            <p>
              <strong>Transmissie:</strong> {car.transmission}
            </p>
            <p>
              <strong>Kilometers:</strong> {car.kilometer}
            </p>
            <p>
              <strong>Kleur:</strong> {car.color}
            </p>
            <p>
              <strong>Deuren:</strong> {car.doors}
            </p>
            <p>
              <strong>PK:</strong> {car.horsepower}
            </p>
            <p>
              <strong>VIN:</strong> {car.vin}
            </p>
            <p>
              <strong>Prijs:</strong> €{car.price}
            </p>
            {car.options && (
              <p className="col-span-2">
                <strong>Opties:</strong> {car.options}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
