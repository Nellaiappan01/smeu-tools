"use client";
import React, { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function AutoCropper() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

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

          // ✅ Crop: top half only
          const halfHeight = height / 2;

          // ✅ Remove 90px extra from bottom of cropped section
          const cropBox = {
            left: 0,
            bottom: halfHeight + 36.5, // shift up by 90px
            right: width,
            top: height,
          };

          const [embeddedPage] = await outPdf.embedPages([page], [cropBox]);

          // ✅ A5 size
          const a5Width = 420;
          const a5Height = 595;
          const newPage = outPdf.addPage([a5Width, a5Height]);

          // ✅ Scale cropped section to cover A5 (no small labels)
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

      // Save output PDF
      const pdfBytes = await outPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "Flipkart-Label-A5.pdf";
      link.click();

      setSuccess(true);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err) {
      console.error("❌ Error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 border rounded-lg bg-white shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
        📦 Flipkart Label Cropper (A5 Full Cover + 90px Trim)
      </h2>

      <label className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105">
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

      {/* Loader */}
      {loading && (
        <div className="mt-6 flex flex-col items-center text-gray-600">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600 border-solid"></div>
          <p className="mt-2 text-sm">Cropping top half + trimming 90px…</p>
        </div>
      )}

      {/* Success */}
      {success && (
        <p className="mt-4 text-green-600 font-semibold animate-bounce">
          ✅ A5 Shipping Label created with 90px bottom trim! Reloading…
        </p>
      )}

      {/* Error */}
      {error && (
        <p className="mt-4 text-red-600 font-semibold">❌ {error}</p>
      )}
    </div>
  );
}
