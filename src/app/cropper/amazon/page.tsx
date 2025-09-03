"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";
import HistoryPanel from "@/components/HistoryPanel";

export default function AmazonCropper({ onSuccess }) {
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
          const halfHeight = height / 2;

          // ⚡ Crop top half (Amazon shipping labels)
          const cropBox = {
            left: 0,
            bottom: halfHeight,
            right: width,
            top: height,
          };

          const [embeddedPage] = await outPdf.embedPages([page], [cropBox]);

          const a5Width = 420;
          const a5Height = 595;
          const newPage = outPdf.addPage([a5Width, a5Height]);

          const scale = Math.max(
            a5Width / embeddedPage.width,
            a5Height / embeddedPage.height
          );

          const drawWidth = embeddedPage.width * scale;
          const drawHeight = embeddedPage.height * scale;
          const dx = (a5Width - drawWidth) / 2;
          const dy = (a5Height - drawHeight) / 2;

          newPage.drawPage(embeddedPage, {
            x: dx,
            y: dy,
            width: drawWidth,
            height: drawHeight,
          });
        }
      }

      const pdfBytes = await outPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const fileName = `Amazon-Label-${new Date().toISOString().slice(0, 19)}.pdf`;
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.click();

      setHistory((prev) => [...prev, { file: fileName, date: new Date().toLocaleString(), url }]);

      setSuccess(true);
      if (onSuccess) onSuccess(); // ✅ log usage
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 border rounded-lg bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-orange-700 mb-4 text-center">
        📦 Amazon Label Cropper
      </h2>

      <label className="cursor-pointer bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-orange-700 transition">
        {loading ? "⏳ Processing..." : "Upload Amazon PDF"}
        <input type="file" accept="application/pdf" multiple onChange={handleFiles} className="hidden" disabled={loading}/>
      </label>

      {success && <p className="mt-4 text-green-600 font-semibold animate-bounce">✅ Amazon Label cropped successfully!</p>}
      {error && <p className="mt-4 text-red-600 font-semibold">❌ {error}</p>}

      <HistoryPanel history={history} />
    </div>
  );
}
