"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Home, Scissors, Store, Info, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-wide">
          <Scissors className="w-6 h-6" />
          SMEU Cropper
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 font-medium">
          <Link href="/" className="flex items-center gap-2 hover:text-gray-200">
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/cropper/flipkart" className="flex items-center gap-2 hover:text-gray-200">
            <Scissors className="w-4 h-4" /> Flipkart
          </Link>
          <Link href="/cropper/meesho" className="flex items-center gap-2 hover:text-gray-200">
            <Store className="w-4 h-4" /> Meesho
          </Link>
          <Link href="/about" className="flex items-center gap-2 hover:text-gray-200">
            <Info className="w-4 h-4" /> About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-blue-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="md:hidden bg-blue-700 flex flex-col px-6 py-4 space-y-4 animate-slideDown">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Home className="w-4 h-4" /> Home
          </Link>
          <Link href="/cropper/flipkart" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Scissors className="w-4 h-4" /> Flipkart
          </Link>
          <Link href="/cropper/meesho" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Store className="w-4 h-4" /> Meesho
          </Link>
          <Link href="/about" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <Info className="w-4 h-4" /> About
          </Link>
        </div>
      )}
    </header>
  );
}
