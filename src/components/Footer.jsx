"use client";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t mt-12 py-6 text-center text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Smeu E-com tools. All rights reserved.</p>
      <p className="mt-1">
        Built with ❤️ for e-commerce sellers. | 
        <a href="https://yourdomain.com" className="text-blue-600 hover:underline ml-1">
          SMEU
        </a>
      </p>
    </footer>
  );
}
