// app/admin/layout.jsx
export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body className="scroll-smooth bg-[#0f0f0f] text-white">{children}</body>
    </html>
  );
}
