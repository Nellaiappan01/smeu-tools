"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Package, Layers } from "lucide-react";
import AutoCropper from "@/components/AutoCropper";
import InvoiceCropper from "@/components/InvoiceCropper";
import Link from "next/link";
import { logUsage } from "@/lib/logUsage";

export default function FlipkartPage() {
  const [selected, setSelected] = useState(null); // "shipping" | "invoice" | "bulk" | null

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <Link href="/" passHref>
        <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-600 cursor-pointer hover:text-orange-500 transition-colors">
          ⚡ Flipkart Label Cropper
        </h2>
      </Link>

      {/* Options */}
      {!selected && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Shipping */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center border hover:border-blue-500 hover:shadow-xl"
            onClick={() => setSelected("shipping")}
          >
            <Package className="w-16 h-16 text-blue-600 mb-4" />
            <h3 className="text-xl font-bold">Shipping Label</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Crop & download shipping labels for A5 printing.
            </p>
          </motion.div>

          {/* Invoice */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center border hover:border-indigo-500 hover:shadow-xl"
            onClick={() => setSelected("invoice")}
          >
            <FileText className="w-16 h-16 text-indigo-600 mb-4" />
            <h3 className="text-xl font-bold">Invoice Label</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Crop invoice for A5 printing.
            </p>
          </motion.div>

          {/* Bulk (future) */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="cursor-pointer bg-white rounded-xl shadow-lg p-8 flex flex-col items-center justify-center text-center border hover:border-green-500 hover:shadow-xl"
            onClick={() => setSelected("bulk")}
          >
            <Layers className="w-16 h-16 text-green-600 mb-4" />
            <h3 className="text-xl font-bold">Bulk Cropper</h3>
            <p className="text-gray-500 mt-2 text-sm">Coming soon — batch crop multiple PDFs.</p>
          </motion.div>
        </div>
      )}

      {/* Shipping */}
      {selected === "shipping" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <AutoCropper onSuccess={() => logUsage("Flipkart Cropper", "monthly")} />
          <button
            onClick={() => setSelected(null)}
            className="mt-6 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </motion.div>
      )}

      {/* Invoice */}
      {selected === "invoice" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <InvoiceCropper onSuccess={() => logUsage("Invoice Cropper", "monthly")} />
          <button
            onClick={() => setSelected(null)}
            className="mt-6 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </motion.div>
      )}

      {/* Bulk */}
      {selected === "bulk" && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 flex flex-col items-center">
          <Layers className="w-20 h-20 text-green-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-700">Bulk Cropper – Coming Soon</h3>
          <button
            onClick={() => setSelected(null)}
            className="mt-6 bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-lg"
          >
            ⬅ Back
          </button>
        </motion.div>
      )}
    </div>
  );
}
