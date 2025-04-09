export default function CarCard({ car, onClick }) {
  return (
    <div className="rounded overflow-hidden shadow-md bg-[#1a1a1a] text-white hover:shadow-lg transition">
      <img
        src={car.images?.[0] || "/placeholder.jpg"}
        alt={car.title}
        className="w-full h-48 object-cover"
      />

      <div onClick={onClick} className="p-3 cursor-pointer">
        <h3 className="text-lg font-bold">{car.title}</h3>
        <p className="text-sm text-green-400 font-semibold">€{car.price}</p>
        <p className="text-xs text-gray-400">
          {car.brand} • {car.year} • {car.kilometer} km
        </p>
      </div>
    </div>
  );
}
