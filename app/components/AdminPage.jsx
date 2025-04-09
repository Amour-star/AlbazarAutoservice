"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useCars } from "../hooks/useCars";
import CarForm from "../components/CarForm";
import CarList from "../components/CarList";

const initialForm = {
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
};

export default function AdminPage() {
  const { user, login, logout } = useAuth();
  const { cars, loadCars, saveCar, deleteCar } = useCars();
  const [form, setForm] = useState(initialForm);
  const [editIndex, setEditIndex] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) loadCars();
  }, [user, loadCars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveCar(form, editIndex);
      setForm(initialForm);
      setEditIndex(null);
    } catch (err) {
      console.error("Fout bij opslaan:", err);
      alert("Fout bij opslaan.");
    }
  };

  const handleEdit = (car, i) => {
    setForm(car);
    setEditIndex(i);
  };

  const handleDelete = async (id) => {
    if (confirm("Verwijderen?")) {
      await deleteCar(id);
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
            onClick={() => login(email, password)}
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
        <button onClick={logout} className="text-sm text-red-400 underline">
          Uitloggen
        </button>
      </div>

      <CarForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        editMode={editIndex !== null}
      />

      <h2 className="text-2xl font-semibold mb-4">Auto Lijst</h2>
      <CarList cars={cars} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
}
