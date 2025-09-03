"use client";
import React, { useRef, useState } from "react";
import Papa from "papaparse";
import { pdfToImages } from "../lib/pdfUtils";
import { fileToDataUrl, imageDims, loadImage } from "../lib/imageUtils";
import { createZipAndPdf } from "../lib/exportUtils";

export default function LabelCropper() {
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState(2);
  const [cols, setCols] = useState(2);
  const [mapping, setMapping] = useState({});
  const [previews, setPreviews] = useState([]);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef();
  const csvRef = useRef();

  async function handleFiles(files) {
    // moved helper logic into imageUtils/pdfUtils
  }

  function handleCSVFile(file) {
    Papa.parse(file, {
      complete: (results) => {
        const map = {};
        results.data.forEach(row => {
          if (!row || row.length < 2) return;
          map[String(row[0]).trim()] = String(row[1]).trim();
        });
        setMapping(map);
      }
    });
  }

  async function prepareLabels() {
    setProcessing(true);
    try {
      const generated = []; 
      // use loadImage, crop, resize
      // ...
      await createZipAndPdf(generated);
      setPreviews(generated.map(g => ({
        sku: g.sku, filename: g.filename, url: URL.createObjectURL(g.blob)
      })));
    } finally {
      setProcessing(false);
    }
  }

  return (
    <div>
      {/* Upload inputs + controls */}
      {/* Items list */}
      {/* Previews list */}
    </div>
  );
}
