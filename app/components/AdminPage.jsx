"use client";

import { useEffect, useState } from "react";
import {
  auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "../lib/firebaseAuth";
import { db, storage } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const BRANDS = [
  "Audi",
  "BMW",
  "Citroën",
  "Dacia",
  "Fiat",
  "Ford",
  "Honda",
  "Hyundai",
  "Kia",
  "Mazda",
  "Mercedes-Benz",
  "Mitsubishi",
  "Nissan",
  "Opel",
  "Peugeot",
  "Renault",
  "Seat",
  "Skoda",
  "Suzuki",
  "Tesla",
  "Toyota",
  "Volkswagen",
  "Volvo",
];

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    fuel: "",
    transmission: "",
    kilometer: "",
    price: "",
    color: "",
    doors: "",
    horsepower: "",
    vin: "",
    options: "",
    description: "",
    images: [],
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    loadCars();
    return () => unsubscribe();
  }, []);

  const loadCars = async () => {
    try {
      const snapshot = await getDocs(collection(db, "cars"));
      const carList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          images: Array.isArray(data.images) ? data.images : [],
        };
      });
      setCars(carList);
    } catch (err) {
      console.error("Error loading cars from Firebase:", err);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert("Login mislukt: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      const uploadPromises = files.map(async (file, index) => {
        const storageRef = ref(storage, `cars/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        return url;
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages],
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) {
      alert("Vul minimaal de titel in en upload een afbeelding.");
      return;
    }

    try {
      if (editIndex !== null && cars[editIndex].id) {
        const carId = cars[editIndex].id;
        await updateDoc(doc(db, "cars", carId), form);
      } else {
        await addDoc(collection(db, "cars"), form);
      }

      setForm({
        title: "",
        brand: "",
        model: "",
        year: "",
        fuel: "",
        transmission: "",
        kilometer: "",
        price: "",
        color: "",
        doors: "",
        horsepower: "",
        vin: "",
        options: "",
        description: "",
        images: [],
      });
      setEditIndex(null);
      await loadCars();
    } catch (err) {
      console.error("Error saving car:", err);
      alert("Fout bij opslaan.");
    }
  };

  const handleEdit = (i) => {
    const car = cars[i];
    setForm({
      ...car,
      images: Array.isArray(car.images)
        ? car.images
        : [car.images].filter(Boolean),
    });
    setEditIndex(i);
  };

  const handleDelete = async (index) => {
    const car = cars[index];
    if (confirm("Verwijderen?") && car.id) {
      try {
        await deleteDoc(doc(db, "cars", car.id));
        await loadCars();
      } catch (err) {
        console.error("Error deleting car:", err);
      }
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white text-black p-6 rounded shadow w-full max-w-sm">
          <h1 className="text-2xl mb-4">Admin Login</h1>
          <input
            type="email"
            className="w-full border px-4 py-2 rounded mb-4"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="w-full border px-4 py-2 rounded mb-4"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-emerald-600 text-white px-4 py-2 rounded w-full"
          >
            Inloggen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f0f0f] text-white p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Auto Beheer</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 underline"
        >
          Uitloggen
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4 mb-10">
        <input
          type="text"
          placeholder="Titel"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />

        <select
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        >
          <option value="">Selecteer Merk</option>
          {BRANDS.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <select
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        >
          <option value="">Selecteer bouwjaar</option>
          {Array.from({ length: 50 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <select
          value={form.fuel}
          onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        >
          <option value="">Selecteer brandstof</option>
          <option value="benzine">Benzine</option>
          <option value="diesel">Diesel</option>
          <option value="hybrid">Hybride</option>
          <option value="gas">Gas</option>
          <option value="electric">Elektrisch</option>
        </select>

        <select
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        >
          <option value="">Selecteer transmissie</option>
          <option value="Automatik">Automatik</option>
          <option value="Manual">Manual</option>
        </select>

        <input
          type="text"
          placeholder="Kilometerstand"
          value={form.kilometer}
          onChange={(e) => setForm({ ...form, kilometer: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Prijs"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Kleur"
          value={form.color}
          onChange={(e) => setForm({ ...form, color: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Aantal deuren"
          value={form.doors}
          onChange={(e) => setForm({ ...form, doors: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="PK (vermogen)"
          value={form.horsepower}
          onChange={(e) => setForm({ ...form, horsepower: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="VIN (chassisnummer)"
          value={form.vin}
          onChange={(e) => setForm({ ...form, vin: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Extra opties"
          value={form.options}
          onChange={(e) => setForm({ ...form, options: e.target.value })}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />

        <textarea
          placeholder="Beschrijving"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />

        <label className="font-medium">Afbeeldingen uploaden (max 10):</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => document.getElementById("imageInput").click()}
          className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
        >
          Upload
        </button>
        <div className="flex flex-wrap gap-2">
          {Array.isArray(form.images) &&
            form.images.map((img, i) => (
              <div key={i} className="relative">
                <img src={img} className="w-24 h-24 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...form.images];
                    updated.splice(i, 1);
                    setForm((prev) => ({ ...prev, images: updated }));
                  }}
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update auto" : "Voeg auto toe"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Auto Lijst</h2>
      <div className="grid gap-4">
        {cars.map((car, i) => (
          <div key={car.id || i} className="border border-gray-700 p-4 rounded">
            <h3 className="text-lg font-bold">
              {car.title} - €{car.price}
            </h3>
            <p>
              {car.brand} {car.model}, {car.year}, {car.kilometer} km
            </p>
            <p className="text-sm text-gray-400">{car.description}</p>
            <div className="flex gap-2 mt-2">
              {Array.isArray(car.images) &&
                car.images
                  .slice(0, 3)
                  .map((img, j) => (
                    <img
                      key={j}
                      src={img}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(i)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Bewerk
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Verwijder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
