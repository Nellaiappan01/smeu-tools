// src/app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";
import React from "react";

export const metadata = {
  title: "SMEU | Free Label Cropper & E-Com Tools",
  description:
    "Free tool to crop Flipkart & Meesho A4 shipping labels into A5 thermal PDF format. SMEU also provides GST automation, price tracking, and e-commerce tools.",
  keywords: [
    "Flipkart Label Cropper",
    "Meesho Label Cropper",
    "Thermal Printer PDF",
    "SMEU Tools",
    "E-commerce Automation",
  ],
  authors: [{ name: "SMEU Team" }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://smeutools.vercel.app"),
  openGraph: {
    title: "SMEU Tools | Free Label Cropper & Business Tools",
    description:
      "Crop Flipkart, Meesho, Amazon, Snapdeal, Myntra labels into thermal printer format + GST automation + business tools.",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://smeutools.vercel.app",
    siteName: "SMEU Tools",
    images: [
      {
        url: "/og-home.png", // put your OG preview image(s) in /public
        width: 1200,
        height: 630,
        alt: "SMEU Tools Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SMEU Tools | Free Label Cropper & Business Tools",
    description:
      "Crop Flipkart, Meesho, Amazon, Snapdeal, Myntra labels into thermal printer format + GST automation + business tools.",
    images: ["/og-home.png"],
  },
};

const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // set in Vercel: NEXT_PUBLIC_GA_ID=G-XXXXXXX
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smeutools.vercel.app";
const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || "PUT_GOOGLE_TOKEN_HERE"; 
// If you prefer HTML-file verification, add the file to /public and DO NOT need this meta.

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Search Console verification meta (optional if you used file upload method) */}
        <meta name="google-site-verification" content={GOOGLE_SITE_VERIFICATION} />

        {/* Favicons + PWA manifest */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#2563EB" />

        {/* Preconnect for fonts (optional) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

        {/* JSON-LD Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SMEU Tools",
              url: SITE_URL,
              logo: `${SITE_URL}/og-home.png`,
              sameAs: [], // add social profile URLs if you have them
            }),
          }}
        />

        {/* GA4 - only include if NEXT_PUBLIC_GA_ID is set */}
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config','${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        ) : null}
      </head>

      <body className="pt-16 bg-gray-50 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
