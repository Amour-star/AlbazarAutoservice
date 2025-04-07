// app/(admin)/layout.js
import "../globals.css";

export const metadata = {
  title: "Admin - Albazar",
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-black">{children}</body>
    </html>
  );
}
