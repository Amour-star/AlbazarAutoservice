"use client";

import dynamic from "next/dynamic";

const AdminPage = dynamic(() => import("../components/AdminPage"), {
  ssr: false,
});

export default function AdminRoute() {
  return <AdminPage />;
}
