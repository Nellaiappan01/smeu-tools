"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What is Flipkart Label Cropper?",
    a: "Flipkart Label Cropper is a free tool that converts your Flipkart A4 PDF shipping labels into 6x4 inch thermal printer format (A5 PDF). It saves time for sellers and avoids manual cutting.",
  },
  {
    q: "Can I use it for Meesho shipping labels?",
    a: "Yes. Our tool is designed for both Flipkart and Meesho sellers. The Flipkart cropper is live now, while the Meesho version is coming soon.",
  },
  {
    q: "What size are the final labels?",
    a: "The final output is a 6x4 inch (152mm × 101mm) PDF label, ready to print on any thermal printer.",
  },
  {
    q: "Do I need to install software?",
    a: "No installation required. The tool runs directly in your browser — 100% online, secure, and fast.",
  },
  {
    q: "Is it really free?",
    a: "Yes. The cropper is free to use for Flipkart and Meesho sellers. Our mission is to simplify shipping processes for e-commerce sellers in India.",
  },
  {
    q: "How can I improve my shipping process?",
    a: "By using a 6x4 thermal label printer along with this cropper tool, you’ll save paper, avoid manual cutting, and prepare shipments faster.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // ✅ Generate JSON-LD schema from faqs array
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map((item) => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a,
        },
      })),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        ❓ Frequently Asked Questions
      </h1>

      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="border rounded-lg shadow-sm bg-white">
            <button
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full text-left px-4 py-3 flex justify-between items-center"
            >
              <span className="font-medium text-gray-800">{item.q}</span>
              <span className="text-gray-500">
                {activeIndex === i ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {activeIndex === i && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-3 text-gray-600"
                >
                  {item.a}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
