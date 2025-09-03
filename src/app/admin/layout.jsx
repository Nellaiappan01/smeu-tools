"use client";
import Link from "next/link";
import { useState } from "react";
import { signOut } from "next-auth/react"; // ✅ Logout
import { BarChart3, Users, Settings, Home, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen flex flex-col">
        {/* Wrapper */}
        <div className="flex flex-1">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:flex w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex-col p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-10">🚀 SMEU Admin</h2>
            <nav className="flex flex-col gap-6">
              <Link href="/admin" className="flex items-center gap-2 hover:text-yellow-400"><Home size={18}/> Dashboard</Link>
              <Link href="/admin/users" className="flex items-center gap-2 hover:text-yellow-400"><Users size={18}/> Users</Link>
              <Link href="/admin/analytics" className="flex items-center gap-2 hover:text-yellow-400"><BarChart3 size={18}/> Analytics</Link>
              <Link href="/admin/settings" className="flex items-center gap-2 hover:text-yellow-400"><Settings size={18}/> Settings</Link>
            </nav>
          </aside>

          {/* Mobile Sidebar Drawer */}
          {open && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setOpen(false)}>
              <aside className="absolute left-0 top-0 w-64 bg-gray-900 text-white h-full p-6">
                <h2 className="text-xl font-bold mb-8">🚀 SMEU Admin</h2>
                <nav className="flex flex-col gap-6">
                  <Link href="/admin" onClick={() => setOpen(false)}>Dashboard</Link>
                  <Link href="/admin/users" onClick={() => setOpen(false)}>Users</Link>
                  <Link href="/admin/analytics" onClick={() => setOpen(false)}>Analytics</Link>
                  <Link href="/admin/settings" onClick={() => setOpen(false)}>Settings</Link>
                </nav>
              </aside>
            </div>
          )}

          {/* Main Content */}
          <div className="flex flex-col flex-1">
            {/* Header */}
            <header className="flex justify-between items-center p-6 bg-white shadow">
              <button className="md:hidden" onClick={() => setOpen(!open)}>
                {open ? <X size={28}/> : <Menu size={28}/>}
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
              <button
                onClick={() => signOut({ callbackUrl: "/" })} // ✅ Redirect to home
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
              >
                Logout
              </button>
            </header>

            {/* Page Content */}
            <main className="flex-1 p-6">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
