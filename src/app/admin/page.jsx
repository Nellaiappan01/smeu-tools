"use client";

import { useState, useEffect } from "react";
import {
  Users,
  Activity,
  Scissors,
  FileText,
  BarChart3,
  Zap,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [traffic, setTraffic] = useState([]);
  const [toolUsage, setToolUsage] = useState([]);
  const [gstReports, setGstReports] = useState([]);
  const [period, setPeriod] = useState("monthly");
  const [liveUsers, setLiveUsers] = useState(87);

  // Fetch real data from APIs
  useEffect(() => {
    fetch("/api/users").then(r => r.json()).then(setUsers);
    fetch("/api/traffic").then(r => r.json()).then(setTraffic);
    fetch("/api/tool-usage").then(r => r.json()).then(setToolUsage);
    fetch("/api/gst-reports").then(r => r.json()).then(setGstReports);
  }, []);

  // Aggregate tool usage by tool name
  const filteredUsage = toolUsage
    .filter(t => t.period === period)
    .map(t => ({
      tool: t.tool,
      usage: t.usage,
    }));

  // Total usage count (sum of all logs)
  const totalUsage = toolUsage.reduce((sum, t) => sum + (t.usage || 0), 0);

  // Simulate live users fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => {
        let change = Math.floor(Math.random() * 10 - 5); // -5 to +5
        let next = prev + change;
        if (next < 50) next = 50;
        if (next > 200) next = 200;
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatedStatCard
          icon={<Users className="text-blue-600" />}
          label="Total Users"
          value={users.length}
          delay={0.1}
        />
        <AnimatedStatCard
          icon={<Activity className="text-green-600" />}
          label="Traffic Records"
          value={traffic.length}
          delay={0.2}
        />
        <AnimatedStatCard
          icon={<Scissors className="text-pink-600" />}
          label="Tool Usage Logs"
          value={totalUsage}
          delay={0.3}
        />
        <AnimatedStatCard
          icon={<FileText className="text-purple-600" />}
          label="GST Reports"
          value={gstReports.length}
          delay={0.4}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Overview */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="text-blue-600" /> Traffic Overview
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={traffic.map(t => ({
                day: new Date(t.date).toLocaleDateString("en-US", { weekday: "short" }),
                users: t.visitors,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                isAnimationActive={true}
                animationDuration={1500}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Tools Usage */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Scissors className="text-pink-600" /> Top Tools Usage
            </h3>
            {/* Toggle Buttons */}
            <div className="flex gap-2">
              {["weekly", "monthly", "yearly"].map(p => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
                    period === p
                      ? "bg-pink-600 text-white shadow"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={period}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredUsage}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="tool" />
                  <YAxis />
                  <Tooltip />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.9} />
                    </linearGradient>
                  </defs>
                  <Bar
                    dataKey="usage"
                    fill="url(#barGradient)"
                    barSize={40}
                    radius={[12, 12, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Live Users Monitor */}
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
    </div>
  );
}

/* Animated Stat Card */
function AnimatedStatCard({ icon, label, value, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(0,0,0,0.15)" }}
      className="bg-white p-6 rounded-xl shadow flex items-center gap-4 cursor-pointer"
    >
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>
    </motion.div>
  );
}
