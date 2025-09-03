"use client";
import "./globals.css"
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Scissors,
  Store,
  ShoppingBag,
  Package,
  Shirt,
  FileText,
  BarChart3,
  Image,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [showCropperOptions, setShowCropperOptions] = useState(false);

  return (
    <div className="pt-20">
      {/* ✅ Hero Section */}
      <motion.div
  initial={{ opacity: 0, y: -40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, type: "spring" }}
  className="text-center px-6"
>
  {/* 🔥 Hero Title */}
<motion.h1
  className="text-5xl md:text-6xl font-extrabold mb-6 cursor-pointer"
  transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
>
  <span
    className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600
               bg-clip-text text-transparent
               bg-[length:300%_300%]
               animate-gradient-slow
               transition-all duration-1000 ease-in-out
               hover:from-orange-400 hover:via-red-500 hover:to-yellow-500"
  >
    SMEU E-Commerce Tools
  </span>
</motion.h1>




  {/* 🔥 Subtitle */}
  <motion.p
    className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto cursor-pointer"
    whileHover={{
      color: "#f97316",         // orange on hover
      scale: 1.05,              // slight zoom
    }}
    transition={{ duration: 0.3 }}
  >
    Professional online tools for sellers — crop labels, manage invoices,
    track product prices, and automate GST reports.
  </motion.p>
</motion.div>


      {/* ✅ Label Cropper Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        {!showCropperOptions ? (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => setShowCropperOptions(true)}
            className="cursor-pointer rounded-3xl shadow-xl p-12 flex flex-col items-center text-center bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 hover:shadow-2xl transition"
          >
            <Scissors className="w-16 h-16 text-blue-600 mb-6" />
            <h3 className="text-4xl font-bold text-gray-900">
              Label Cropper
            </h3>
            <p className="text-gray-600 mt-4 text-lg">
              Flipkart, Meesho, Amazon, Snapdeal, Myntra — crop A4 PDFs into
              thermal-ready sizes.
            </p>
            <p className="mt-6 text-sm font-medium text-blue-600 uppercase tracking-wide">
              Click to Explore Tools
            </p>
          </motion.div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
              ✂ Choose Your Platform
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              <CropperCard
                href="/cropper/flipkart"
                icon={<Scissors className="w-12 h-12 text-blue-600" />}
                title="Flipkart"
                desc="Crop A4 Flipkart labels into A5 thermal format."
              />
              <CropperCard
                href="/cropper/meesho"
                icon={<Store className="w-12 h-12 text-pink-600" />}
                title="Meesho"
                desc="Crop Meesho shipping labels (coming soon)."
              />
              <CropperCard
                href="/cropper/amazon"
                icon={<ShoppingBag className="w-12 h-12 text-yellow-600" />}
                title="Amazon"
                desc="Crop Amazon labels (coming soon)."
              />
              <CropperCard
                href="/cropper/snapdeal"
                icon={<Package className="w-12 h-12 text-red-600" />}
                title="Snapdeal"
                desc="Crop Snapdeal labels (coming soon)."
              />
              <CropperCard
                href="/cropper/myntra"
                icon={<Shirt className="w-12 h-12 text-purple-600" />}
                title="Myntra"
                desc="Crop Myntra labels (coming soon)."
              />
            </div>
            <div className="text-center mt-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowCropperOptions(false)}
                className="bg-gray-800 text-white px-8 py-3 rounded-full shadow hover:bg-gray-900 transition"
              >
                ⬅ Back to Home
              </motion.button>
            </div>
          </>
        )}
      </div>

      {/* ✅ Business Tools Section */}
      <div className="max-w-6xl mx-auto mt-24 px-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          💼 Business Tools
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <CropperCard
            href="/tools/gst"
            icon={<FileText className="w-12 h-12 text-green-600" />}
            title="GST Automation"
            desc="Generate automated GST invoices & reports."
          />
          <CropperCard
            href="/tools/price-history"
            icon={<BarChart3 className="w-12 h-12 text-orange-600" />}
            title="Price History Checker"
            desc="Track product prices & find best time to buy."
          />
          <CropperCard
            href="/tools/background-remover"
            icon={<Image className="w-12 h-12 text-purple-600" />}
            title="Image Background Remover"
            desc="Remove product photo backgrounds in 1 click."
          />
        </div>
      </div>
    </div>
  );
}

/* 🔹 Professional Card Component */
function CropperCard({ href, icon, title, desc }) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="rounded-2xl bg-white shadow-lg p-8 text-center border border-gray-200 hover:shadow-2xl transition"
      >
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-3 text-sm">{desc}</p>
      </motion.div>
    </Link>
  );
}
