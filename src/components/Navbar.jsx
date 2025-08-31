"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import {
  Home,
  Scissors,
  Store,
  Info,
  HelpCircle,
  FileText,
  Menu,
  X,
  ShoppingBag,
  Package,
  Shirt,
} from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown if click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Framer Motion Variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.25 } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const mobileVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 0.4 } },
    exit: { opacity: 0, x: "100%", transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, type: "spring" }}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg fixed top-0 left-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Scissors className="w-6 h-6" />
          SMEU E-com Tools
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center font-medium">
          <NavLink href="/" icon={<Home className="w-4 h-4" />}>Home</NavLink>

          {/* Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 hover:text-gray-200 transition-colors"
              onClick={() => setDropdown(!dropdown)}
            >
              <Scissors className="w-4 h-4" /> Label Cropper ▼
            </button>
            <AnimatePresence>
              {dropdown && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute mt-2 bg-white text-gray-700 border rounded shadow-lg w-48 overflow-hidden"
                >
                  <DropdownLink href="/cropper/flipkart" icon={<Scissors className="w-4 h-4" />} closeDropdown={() => setDropdown(false)}>Flipkart</DropdownLink>
                  <DropdownLink href="/cropper/meesho" icon={<Store className="w-4 h-4" />} closeDropdown={() => setDropdown(false)}>Meesho</DropdownLink>
                  <DropdownLink href="/cropper/amazon" icon={<ShoppingBag className="w-4 h-4" />} closeDropdown={() => setDropdown(false)}>Amazon</DropdownLink>
                  <DropdownLink href="/cropper/snapdeal" icon={<Package className="w-4 h-4" />} closeDropdown={() => setDropdown(false)}>Snapdeal</DropdownLink>
                  <DropdownLink href="/cropper/myntra" icon={<Shirt className="w-4 h-4" />} closeDropdown={() => setDropdown(false)}>Myntra</DropdownLink>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <NavLink href="/faq" icon={<HelpCircle className="w-4 h-4" />}>FAQ</NavLink>
          <NavLink href="/blog" icon={<FileText className="w-4 h-4" />}>Blog</NavLink>
          <NavLink href="/about" icon={<Info className="w-4 h-4" />}>About</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden p-2 rounded hover:bg-blue-700" onClick={() => setOpen(!open)}>
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="md:hidden fixed top-0 right-0 h-full w-64 bg-blue-700 text-white flex flex-col px-6 py-10 space-y-6 shadow-lg z-40"
          >
            <NavLink href="/" icon={<Home className="w-4 h-4" />} onClick={() => setOpen(false)}>Home</NavLink>
            <NavLink href="/cropper/flipkart" icon={<Scissors className="w-4 h-4" />} onClick={() => setOpen(false)}>Flipkart</NavLink>
            <NavLink href="/cropper/meesho" icon={<Store className="w-4 h-4" />} onClick={() => setOpen(false)}>Meesho</NavLink>
            <NavLink href="/cropper/amazon" icon={<ShoppingBag className="w-4 h-4" />} onClick={() => setOpen(false)}>Amazon</NavLink>
            <NavLink href="/cropper/snapdeal" icon={<Package className="w-4 h-4" />} onClick={() => setOpen(false)}>Snapdeal</NavLink>
            <NavLink href="/cropper/myntra" icon={<Shirt className="w-4 h-4" />} onClick={() => setOpen(false)}>Myntra</NavLink>
            <NavLink href="/faq" icon={<HelpCircle className="w-4 h-4" />} onClick={() => setOpen(false)}>FAQ</NavLink>
            <NavLink href="/blog" icon={<FileText className="w-4 h-4" />} onClick={() => setOpen(false)}>Blog</NavLink>
            <NavLink href="/about" icon={<Info className="w-4 h-4" />} onClick={() => setOpen(false)}>About</NavLink>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// 🔹 Reusable NavLink
function NavLink({ href, icon, children, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative flex items-center gap-2 group hover:text-yellow-300 transition-colors"
    >
      {icon}
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-yellow-300 transition-all group-hover:w-full"></span>
    </Link>
  );
}

// 🔹 Reusable Dropdown Link
function DropdownLink({ href, icon, children, active = false, closeDropdown }) {
  return (
    <Link
      href={href}
      onClick={closeDropdown}
      className={`flex items-center gap-2 px-4 py-2 hover:bg-blue-50 ${
        active ? "text-blue-600 font-semibold" : ""
      }`}
    >
      {icon}
      {children}
    </Link>
  );
}
