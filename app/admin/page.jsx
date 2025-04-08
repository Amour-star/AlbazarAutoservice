"use client";
import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
const YEARS = Array.from(
  { length: 50 },
  (_, i) => new Date().getFullYear() - i
);

function SortableImage({ image, index, onRemove, onMain, isMain }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: index });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative group"
    >
      <img
        src={image}
        className={`w-24 h-24 object-cover rounded border-2 ${
          isMain ? "border-yellow-400" : "border-gray-300"
        }`}
        alt={`preview-${index}`}
        onClick={() => onMain(index)}
      />
      <button
        onClick={() => onRemove(index)}
        className="absolute top-0 right-0 bg-red-600 text-white w-5 h-5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition"
        title="Verwijder"
      >
        ✕
      </button>
      {isMain && (
        <span className="absolute bottom-0 left-0 text-xs bg-yellow-400 text-black px-1 rounded-tr">
          ⭐ Hoofd
        </span>
      )}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    year: "",
    fuel: "",
    transmission: "",
    kilometer: "",
    price: "",
    description: "",
    images: [],
    mainImageIndex: 0,
  });

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    const loadCars = async () => {
      try {
        const res = await fetch("/api/cars");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error("Error loading cars:", err);
      }
    };

    loadCars();
  }, []);

  const handleLogin = () => {
    if (password === "admin123") setAuthenticated(true);
    else alert("Wrong password");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + form.images.length > 10) {
      alert("Maximaal 10 afbeeldingen per auto");
      return;
    }

    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(file);
        });
      })
    ).then((newImages) => {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages],
        mainImageIndex: prev.images.length === 0 ? 0 : prev.mainImageIndex,
      }));
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const required = [
      "title",
      "brand",
      "year",
      "fuel",
      "transmission",
      "kilometer",
      "price",
      "description",
    ];
    if (required.some((k) => !form[k]) || form.images.length === 0) {
      alert("Vul alle velden in en upload minimaal één afbeelding.");
      return;
    }

    const updated = [...cars];
    if (editIndex !== null) updated[editIndex] = form;
    else updated.push(form);

    setCars(updated);
    setForm({
      title: "",
      brand: "",
      year: "",
      fuel: "",
      transmission: "",
      kilometer: "",
      price: "",
      description: "",
      images: [],
      mainImageIndex: 0,
    });
    setEditIndex(null);

    await fetch("/api/save-cars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  const handleEdit = (i) => {
    setForm(cars[i]);
    setEditIndex(i);
  };

  const handleDelete = (i) => {
    if (confirm("Verwijderen?")) {
      const updated = [...cars];
      updated.splice(i, 1);
      setCars(updated);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const reordered = arrayMove(form.images, active.id, over.id);
    let newMain = form.mainImageIndex;
    if (active.id === newMain) newMain = over.id;
    else if (active.id < newMain && over.id >= newMain) newMain -= 1;
    else if (active.id > newMain && over.id <= newMain) newMain += 1;

    setForm((prev) => ({
      ...prev,
      images: reordered,
      mainImageIndex: newMain,
    }));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow w-full max-w-sm">
          <h1 className="text-2xl mb-4">Admin Login</h1>
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
    <div className="bg-white p-6 max-w-5xl mx-auto text-black">
      <h1 className="text-3xl font-bold mb-6">Auto Beheer</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <select
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Selecteer merk</option>
          {BRANDS.map((b, i) => (
            <option key={i} value={b}>
              {b}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Titel"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          placeholder="Beschrijving"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Prijs"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Kilometerstand"
          value={form.kilometer}
          onChange={(e) => setForm({ ...form, kilometer: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        />
        <select
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Selecteer bouwjaar</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={form.fuel}
          onChange={(e) => setForm({ ...form, fuel: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Selecteer brandstof</option>
          <option value="benzine">Benzine</option>
          <option value="diesel">Diesel</option>
          <option value="hybride">Hybride</option>
          <option value="elektrisch">Elektrisch</option>
          <option value="gas">Gas</option>
        </select>
        <select
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
          className="w-full border px-4 py-2 rounded"
        >
          <option value="">Selecteer transmissie</option>
          <option value="Automaat">Automaat</option>
          <option value="Handgeschakeld">Handgeschakeld</option>
        </select>

        <label className="block font-medium">
          Afbeeldingen uploaden (max 10):
        </label>
        <button
          type="button"
          onClick={() => document.getElementById("imageInput").click()}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Kies afbeeldingen
        </button>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImageUpload}
        />

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={form.images.map((_, i) => i)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2">
              {form.images.map((img, i) => (
                <SortableImage
                  key={i}
                  image={img}
                  index={i}
                  isMain={i === form.mainImageIndex}
                  onRemove={(index) => {
                    const updated = [...form.images];
                    updated.splice(index, 1);
                    setForm((prev) => ({
                      ...prev,
                      images: updated,
                      mainImageIndex:
                        prev.mainImageIndex === index ? 0 : prev.mainImageIndex,
                    }));
                  }}
                  onMain={(index) =>
                    setForm({ ...form, mainImageIndex: index })
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update auto" : "Voeg auto toe"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Auto Lijst</h2>
      <div className="grid gap-4">
        {cars.map((car, i) => (
          <div key={i} className="border p-4 rounded bg-white shadow">
            <h3 className="text-lg font-bold">
              {car.title} - {car.price}
            </h3>
            <p>
              {car.year} | {car.fuel} | {car.transmission} | {car.kilometer} km
            </p>
            <p className="mb-2">{car.description}</p>
            <div className="flex gap-2 overflow-x-auto">
              {car.images.map((img, j) => (
                <img
                  key={j}
                  src={img}
                  className="w-20 h-20 object-cover rounded"
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
