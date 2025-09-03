"use client";
import { useState, useEffect } from "react";
import { Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveUsersCard() {
  const [liveUsers, setLiveUsers] = useState(87); // start mock value

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers((prev) => {
        const change = Math.floor(Math.random() * 10) - 5; // -5 to +5
        let newValue = prev + change;
        if (newValue < 50) newValue = 50;
        if (newValue > 200) newValue = 200;
        return newValue;
      });
    }, 3000); // every 3s

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl shadow-2xl flex items-center justify-between"
    >
      <div>
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Zap className="text-yellow-500 animate-pulse" /> Live Users Online
        </h3>
        <p className="text-4xl font-extrabold text-blue-700">{liveUsers}</p>
        <p className="text-gray-500 text-sm mt-1">active right now</p>
      </div>
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-inner"
      >
        <Users className="text-blue-600 w-12 h-12" />
      </motion.div>
    </motion.div>
  );
}
