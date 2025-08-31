"use client";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
          animate={{
            y: [0, -8, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
