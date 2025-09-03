"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPage() {
  const data = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3200 },
    { month: "Mar", revenue: 5400 },
    { month: "Apr", revenue: 3000 },
    { month: "May", revenue: 6200 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">📈 Analytics</h2>
      <div className="bg-white p-6 rounded-xl shadow">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month"/>
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={3}/>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
