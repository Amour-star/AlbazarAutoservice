"use client";

export default function CarList({ cars, onEdit, onDelete }) {
  if (!cars.length)
    return <p className="text-gray-400">Geen auto's beschikbaar.</p>;

  return (
    <div className="grid gap-4">
      {cars.map((car, i) => (
        <div key={car.id || i} className="border border-gray-700 p-4 rounded">
          <h3 className="text-lg font-bold">
            {car.title} – €{car.price}
          </h3>
          <p className="text-sm">
            {car.brand} {car.model}, {car.year}, {car.kilometer} km
          </p>
          <p className="text-sm text-gray-400">{car.description}</p>

          {/* Image previews */}
          <div className="flex gap-2 mt-2">
            {Array.isArray(car.images) &&
              car.images
                .slice(0, 3)
                .map((img, j) => (
                  <img
                    key={j}
                    src={img}
                    alt={`car-${i}-${j}`}
                    className="w-16 h-16 object-cover rounded"
                  />
                ))}
          </div>

          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(car, i)}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              Bewerk
            </button>
            <button
              onClick={() => onDelete(car.id)}
              className="px-3 py-1 bg-red-500 text-white rounded"
            >
              Verwijder
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
