"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    year: "",
    fuel: "",
    transmission: "",
    kilometer: "",
    images: [],
  });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("cars");
    if (stored) setCars(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cars", JSON.stringify(cars));
  }, [cars]);

  const handleLogin = () => {
    if (password === "admin123") setAuthenticated(true);
    else alert("Wrong password");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + form.images.length > 10) {
      alert("Max 10 images per car");
      return;
    }
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then((newImages) => {
      setForm({ ...form, images: [...form.images, ...newImages] });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !form.title ||
      !form.price ||
      !form.description ||
      !form.year ||
      !form.fuel ||
      !form.transmission ||
      !form.kilometer ||
      form.images.length === 0
    ) {
      alert("Please fill in all fields and add at least one image.");
      return;
    }
    if (editIndex !== null) {
      const updated = [...cars];
      updated[editIndex] = form;
      setCars(updated);
    } else {
      setCars([...cars, form]);
    }
    setForm({
      title: "",
      price: "",
      description: "",
      year: "",
      fuel: "",
      transmission: "",
      kilometer: "",
      images: [],
    });
    setEditIndex(null);
  };

  const handleEdit = (index) => {
    setForm(cars[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    if (confirm("Verwijderen?")) {
      const updated = [...cars];
      updated.splice(index, 1);
      setCars(updated);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded shadow w-full max-w-sm">
          <h1 className="text-2xl mb-4">Admin Login</h1>
          <input
            type="password"
            className="w-full border px-4 py-2 rounded mb-4"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleLogin}
            className="bg-emerald-600 text-white px-4 py-2 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Car Admin Panel</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.brand || ""}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
        >
          <option value="">Selecteer merk</option>
          <option value="Audi">Audi</option>
          <option value="BMW">BMW</option>
          <option value="Citroën">Citroën</option>
          <option value="Dacia">Dacia</option>
          <option value="Fiat">Fiat</option>
          <option value="Ford">Ford</option>
          <option value="Honda">Honda</option>
          <option value="Hyundai">Hyundai</option>
          <option value="Kia">Kia</option>
          <option value="Mazda">Mazda</option>
          <option value="Mercedes-Benz">Mercedes-Benz</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Nissan">Nissan</option>
          <option value="Opel">Opel</option>
          <option value="Peugeot">Peugeot</option>
          <option value="Renault">Renault</option>
          <option value="Seat">Seat</option>
          <option value="Skoda">Skoda</option>
          <option value="Suzuki">Suzuki</option>
          <option value="Tesla">Tesla</option>
          <option value="Toyota">Toyota</option>
          <option value="Volkswagen">Volkswagen</option>
          <option value="Volvo">Volvo</option>
        </select>
        <input
          type="text"
          placeholder="Titel"
          className="w-full border px-4 py-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prijs"
          className="w-full border px-4 py-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
        >
          <option value="">Selecteer bouwjaar</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.fuel}
          onChange={(e) => setForm({ ...form, fuel: e.target.value })}
        >
          <option value="">Selecteer brandstof</option>
          <option value="benzine">Benzine</option>
          <option value="diesel">Diesel</option>
          <option value="hybride">Hybride</option>
          <option value="elektrisch">Elektrisch</option>
          <option value="gas">Gas</option>
        </select>
        <select
          className="w-full border px-4 py-2 rounded"
          value={form.transmission}
          onChange={(e) => setForm({ ...form, transmission: e.target.value })}
        >
          <option value="">Selecteer transmissie</option>
          <option value="Automaat">Automaat</option>
          <option value="Handgeschakeld">Handgeschakeld</option>
        </select>
        <input
          type="text"
          placeholder="Kilometerstand"
          className="w-full border px-4 py-2 rounded"
          value={form.kilometer}
          onChange={(e) => setForm({ ...form, kilometer: e.target.value })}
        />
        <textarea
          placeholder="Beschrijving"
          className="w-full border px-4 py-2 rounded"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <label className="block font-medium">
          Afbeeldingen uploaden (max 10):
        </label>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => document.getElementById("imageInput").click()}
        >
          Kies afbeeldingen
        </button>
        <input
          type="file"
          accept="image/*"
          multiple
          id="imageInput"
          className="hidden"
          onChange={handleImageUpload}
        />
        <div className="flex flex-wrap gap-2">
          {form.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {editIndex !== null ? "Update Car" : "Add Car"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Cars</h2>
      <div className="grid gap-4">
        {cars.map((car, index) => (
          <div key={index} className="border p-4 rounded">
            <h3 className="text-lg font-bold">
              {car.title} - {car.price}
            </h3>
            <p>
              {car.brand} | {car.year} | {car.fuel} | {car.transmission} |{" "}
              {car.kilometer} km
            </p>
            <p className="mb-2">{car.description}</p>
            <div className="flex gap-2 overflow-x-auto">
              {car.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="px-3 py-1 bg-blue-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
