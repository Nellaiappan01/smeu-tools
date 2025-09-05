"use client";

import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import HistoryPanel from "./HistoryPanel";

/**
 * AutoCropper (JSX version)
 * Props:
 *   - onSuccess?: () => void   // optional; called after a successful crop+download
 */
export default function AutoCropper({ onSuccess } = {}) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoading(true);
    setSuccess(false);
    setError("");

    try {
      const outPdf = await PDFDocument.create();

      for (const file of files) {
        const bytes = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(bytes);
        const pages = pdfDoc.getPages();

        for (const page of pages) {
          const { width, height } = page.getSize();
          const halfHeight = height / 2;

          // Crop TOP half of A4 and trim 36.5 px from its bottom (your requested value)
          const cropBox = {
            left: 0,
            bottom: halfHeight + 36.5,
            right: width,
            top: height - 20,
          };

          const [embeddedPage] = await outPdf.embedPages([page], [cropBox]);

          // Target A5 page (portrait)
          const A5_W = 420;
          const A5_H = 595;
          const newPage = outPdf.addPage([A5_W, A5_H]);

          // Scale to cover A5 (avoid tiny label)
          const scale = Math.max(A5_W / embeddedPage.width, A5_H / embeddedPage.height);
          const drawW = embeddedPage.width * scale;
          const drawH = embeddedPage.height * scale;
          const dx = (A5_W - drawW) / 2;
          const dy = (A5_H - drawH) / 2;

          newPage.drawPage(embeddedPage, { x: dx, y: dy, width: drawW, height: drawH });
        }
      }

      // Save and auto-download
      const pdfBytes = await outPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const fileName = `Flipkart-Label-${new Date().toISOString().slice(0, 19)}.pdf`;
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();

      // Update history list
      setHistory((prev) => [
        ...prev,
        { file: fileName, date: new Date().toLocaleString(), url },
      ]);

      setSuccess(true);
      if (onSuccess) onSuccess(); // <-- call the optional callback
    } catch (err) {
      console.error("❌ AutoCropper error:", err);
      setError(err?.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border rounded-lg bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        📦 Flipkart Shipping Label Cropper (A5 + 36.5px Trim)
      </h2>

      <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition">
        {loading ? "⏳ Processing..." : "Upload A4 PDF"}
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFiles}
          className="hidden"
          disabled={loading}
        />
      </label>

      {loading && (
        <div className="mt-4 flex flex-col items-center text-gray-600">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          <p className="mt-2 text-sm">Cropping top half (shipping label)…</p>
        </div>
      )}

      {success && (
        <p className="mt-4 text-green-600 font-semibold animate-bounce">
          ✅ Shipping Label PDF created successfully!
        </p>
      )}

      {error && <p className="mt-4 text-red-600 font-semibold">❌ {error}</p>}

      {/* History panel */}
      <HistoryPanel history={history} />
    </div>
  );
}
