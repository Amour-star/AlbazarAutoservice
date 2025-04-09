"use client";
import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function AutosSection() {
  const [cars, setCars] = useState([]);
  const [brandFilter, setBrandFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const snapshot = await getDocs(collection(db, "cars"));
        const carList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carList);
      } catch (err) {
        console.error("Error loading cars from Firestore:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const availableBrands = [
    ...new Set(cars.map((car) => car.brand).filter(Boolean)),
  ];

  let filteredCars = cars.filter((car) => {
    const brandMatch =
      brandFilter === "all" ||
      car.brand?.toLowerCase() === brandFilter.toLowerCase();

    const numericPrice = parseInt(car.price.replace(/[^\d]/g, "")) || 0;
    const priceMatch =
      priceFilter === "all" ||
      (priceFilter === "under10" && numericPrice < 10000) ||
      (priceFilter === "10to15" &&
        numericPrice >= 10000 &&
        numericPrice <= 15000) ||
      (priceFilter === "over15" && numericPrice > 15000);

    return brandMatch && priceMatch;
  });

  if (sortBy === "price") {
    filteredCars.sort((a, b) => {
      const priceA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
      const priceB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
      return priceA - priceB;
    });
  } else if (sortBy === "year") {
    filteredCars.sort((a, b) => parseInt(b.year) - parseInt(a.year));
  }

  return (
    <section
      id="autos"
      className="relative bg-[#0f0f0f] px-4 sm:px-6 py-12 overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0" />

      <div className="relative z-20 text-yellow-100 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400 mb-8 text-center">
          Onze Auto's
        </h2>

        <div className="flex flex-col md:flex-row md:flex-wrap gap-4 justify-center items-center mb-10 text-white text-sm text-center">
          <div>
            <label className="text-sm font-medium">Merk:</label>
            <select
              className="ml-2 bg-[#1a1a1a]/80 border border-yellow-400 text-white rounded px-2 py-1"
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">Alle merken</option>
              {availableBrands.map((brand, i) => (
                <option key={i} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Prijs:</label>
            <select
              className="ml-2 bg-[#1a1a1a]/80 border border-yellow-400 text-white rounded px-2 py-1"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="all">Alle prijsklassen</option>
              <option value="under10">Onder €10.000</option>
              <option value="10to15">€10.000 – €15.000</option>
              <option value="over15">Boven €15.000</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Sorteren:</label>
            <select
              className="ml-2 bg-[#1a1a1a]/80 border border-yellow-400 text-white rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Standaard</option>
              <option value="price">Prijs (laag → hoog)</option>
              <option value="year">Nieuwste eerst</option>
            </select>
          </div>

          <button
            onClick={() => {
              setBrandFilter("all");
              setPriceFilter("all");
              setSortBy("default");
            }}
            className="bg-yellow-600 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-500 self-center"
          >
            Reset filters
          </button>
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, i) => (
            <CarCard key={i} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
}
