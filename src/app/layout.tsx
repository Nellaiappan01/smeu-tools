// src/app/layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Providers from "./providers";
import React from "react";

/**
 * NOTE:
 * - Set NEXT_PUBLIC_SITE_URL in Vercel to your canonical URL, e.g. https://smeutools.vercel.app
 * - Optionally set NEXT_PUBLIC_GA_ID and NEXT_PUBLIC_GOOGLE_VERIFICATION in Vercel.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://smeutools.vercel.app";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
const GOOGLE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || ""; // optional meta token

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
  // safe metadataBase creation
  metadataBase: (() => {
    try {
      return new URL(SITE_URL);
    } catch {
      // Fallback to a safe literal if env is malformed
      return new URL("https://smeutools.vercel.app");
    }
  })(),
  openGraph: {
    title: "SMEU Tools | Free Label Cropper & Business Tools",
    description:
      "Crop Flipkart, Meesho, Amazon, Snapdeal, Myntra labels into thermal printer format + GST automation + business tools.",
    url: SITE_URL,
    siteName: "SMEU Tools",
    images: [
      {
        url: "/og-home.png",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Google Search Console verification (optional - use only if you prefer meta verification) */}
        {GOOGLE_VERIFICATION && (
          <meta name="google-site-verification" content={GOOGLE_VERIFICATION} />
        )}

        {/* Favicons and PWA manifest (place these files in /public/) */}
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
              sameAs: [], // add social profiles if available
            }),
          }}
        />

        {/* GA4 - include only when NEXT_PUBLIC_GA_ID is set in Vercel */}
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
