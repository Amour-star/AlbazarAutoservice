"use client";
import { useRef, useState } from "react";
import { BRANDS, FUEL_TYPES, TRANSMISSIONS } from "../constants/carOptions";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

export default function CarForm({ form, setForm, onSubmit, editMode }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    if (files.length + (form.images?.length || 0) > 10) {
      alert("Maximaal 10 afbeeldingen per auto");
      return;
    }

    try {
      setUploading(true);

      const uploadPromises = files.map(async (file) => {
        const storageRef = ref(storage, `cars/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      });

      const uploadedImages = await Promise.all(uploadPromises);

      setForm((prev) => ({
        ...prev,
        images: [...(prev.images || []), ...uploadedImages],
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Afbeelding uploaden mislukt");
    } finally {
      setUploading(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 mb-10">
      <input
        type="text"
        placeholder="Titel"
        value={form.title}
        onChange={(e) => handleFieldChange("title", e.target.value)}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      />

      <select
        value={form.brand}
        onChange={(e) => handleFieldChange("brand", e.target.value)}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      >
        <option value="">Selecteer Merk</option>
        {BRANDS.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Model"
        value={form.model}
        onChange={(e) => handleFieldChange("model", e.target.value)}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      />

      <select
        value={form.year}
        onChange={(e) => handleFieldChange("year", e.target.value)}
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
        onChange={(e) => handleFieldChange("fuel", e.target.value)}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      >
        <option value="">Selecteer brandstof</option>
        {FUEL_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select
        value={form.transmission}
        onChange={(e) => handleFieldChange("transmission", e.target.value)}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      >
        <option value="">Selecteer transmissie</option>
        {TRANSMISSIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      {[
        ["kilometer", "Kilometerstand"],
        ["price", "Prijs"],
        ["color", "Kleur"],
        ["doors", "Aantal deuren"],
        ["horsepower", "PK (vermogen)"],
        ["vin", "VIN (chassisnummer)"],
        ["options", "Extra opties"],
      ].map(([key, placeholder]) => (
        <input
          key={key}
          type="text"
          placeholder={placeholder}
          value={form[key]}
          onChange={(e) => handleFieldChange(key, e.target.value)}
          className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
        />
      ))}

      <textarea
        placeholder="Beschrijving"
        value={form.description}
        onChange={(e) => handleFieldChange("description", e.target.value)}
        rows={4}
        className="w-full border border-gray-600 bg-black text-white px-4 py-2 rounded"
      />

      {/* Upload Button */}
      <label className="font-medium">Afbeeldingen uploaden (max 10):</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="bg-blue-600 text-white px-4 py-2 rounded w-fit"
        disabled={uploading}
      >
        {uploading ? "⏳ Uploaden..." : "📷 Kies Afbeeldingen"}
      </button>

      {/* Thumbnails */}
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
        {editMode ? "Update auto" : "Voeg auto toe"}
      </button>
    </form>
  );
}
