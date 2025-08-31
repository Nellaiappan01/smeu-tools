"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import HistoryPanel from "./HistoryPanel";

export default function InvoiceCropper() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
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

          // ✅ Crop bottom half (invoice section only)
          const halfHeight = height / 2;

          // 🔹 Adjusted crop to avoid cutting content:
          // - Trim 10px top (was 20px before, safer now)
          // - Trim 30px bottom whitespace
          const cropBox = {
            left: 0,
            bottom: 30,           // bottom trim
            right: width,
            top: halfHeight +34, // reduce top trim → safer
          };

          const [embeddedPage] = await outPdf.embedPages([page], [cropBox]);

          // ✅ A5 Portrait page
          const a5Width = 420;
          const a5Height = 595;
          const newPage = outPdf.addPage([a5Width, a5Height]);

          // ✅ Scale properly to avoid shrinking invoice
          const scale = a5Width / embeddedPage.width;
          const drawWidth = embeddedPage.width * scale;
          const drawHeight = embeddedPage.height * scale;

          newPage.drawPage(embeddedPage, {
              x: 0,
              y: a5Height - drawHeight, // 🔥 stick at top
              width: drawWidth,
              height: drawHeight,
          });
        }
      }

      // ✅ Save PDF
      const pdfBytes = await outPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const fileName = `Flipkart-Invoice-${new Date()
        .toISOString()
        .slice(0, 19)}.pdf`;
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      // ✅ Save to history
      setHistory((prev) => [
        ...prev,
        { file: fileName, date: new Date().toLocaleString(), url },
      ]);

      setSuccess(true);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border rounded-lg bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">
        📄 Flipkart Invoice Cropper (A5 – Smart Trim)
      </h2>

      <label className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
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
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600 border-solid"></div>
          <p className="mt-2 text-sm">Cropping invoice (bottom half)…</p>
        </div>
      )}

      {success && (
        <p className="mt-4 text-green-600 font-semibold animate-bounce">
          ✅ Invoice PDF created successfully!
        </p>
      )}

      {error && <p className="mt-4 text-red-600 font-semibold">❌ {error}</p>}

      <HistoryPanel history={history} />
    </div>
  );
}
