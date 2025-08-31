"use client";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function PriceHistoryPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-24 px-6"
    >
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-4 text-green-600">
        <FileText className="w-8 h-8" /> Price History Checker
      </h1>
      <p className="text-gray-600 mb-8">
        Enter a product link and see historical price trends across Flipkart, Amazon, and more.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500">📊 Coming Soon! This feature is under development.</p>
      </div>
    </motion.div>
  );
}
