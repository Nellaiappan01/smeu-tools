"use client";
import { motion } from "framer-motion";
import { Image } from "lucide-react";

export default function BgRemoverPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto py-24 px-6"
    >
      <h1 className="text-3xl font-bold flex items-center gap-3 mb-4 text-purple-600">
        <Image className="w-8 h-8" /> Background Remover
      </h1>
      <p className="text-gray-600 mb-8">
        Upload your product photos and remove backgrounds instantly with AI.
      </p>

      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <p className="text-gray-500">🖼 Coming Soon! This feature is under development.</p>
      </div>
    </motion.div>
  );
}
