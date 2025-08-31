"use client";
import React from "react";
import { Clock } from "lucide-react";

export default function HistoryPanel({ history }) {
  if (!history.length) return null;

  return (
    <div className="mt-8 bg-gray-50 border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5 text-gray-500" /> History
      </h3>
      <ul className="space-y-2">
        {history.map((h, i) => (
          <li
            key={i}
            className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border"
          >
            <span className="text-sm font-medium text-gray-800">
              {h.file} <span className="text-gray-500">({h.date})</span>
            </span>
            <a
              href={h.url}
              download={h.file}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
            >
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
