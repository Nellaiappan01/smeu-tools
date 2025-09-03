import "./globals.css";
import Navbar from "../components/Navbar"; // ✅ make sure path is correct
import Footer from "../components/Footer"; // optional if you already made footer
import Providers from "./providers";

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
  openGraph: {
    title: "SMEU Tools | Free Label Cropper & Business Tools",
    description:
      "Crop Flipkart, Meesho, Amazon, Snapdeal, Myntra labels into thermal printer format + GST automation + business tools.",
    url: "https://smeutools.com",
    siteName: "SMEU Tools",
    images: [
      {
        url: "/smeu-preview.png", // ✅ put preview image in /public
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
    images: ["/smeu-preview.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Google Analytics Placeholder (Safe until you add real GA4 ID) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXX');
            `,
          }}
        />
      </head>
      <body className="pt-16 bg-gray-50 flex flex-col min-h-screen">
        <Navbar /> {/* ✅ HEADER always on top */}
        <main className="flex-grow">
          <Providers>{children}</Providers>
        </main>
        <Footer /> {/* ✅ optional */}
      </body>
    </html>
  );
}
