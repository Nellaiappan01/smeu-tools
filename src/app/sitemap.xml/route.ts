// src/app/sitemap.xml/route.ts
import { NextResponse } from "next/server";

const rawBase = process.env.NEXT_PUBLIC_SITE_URL || "https://smeutools.vercel.app";
// remove any trailing slash and accidental leading '=' characters
const base = rawBase.replace(/^=+/, "").replace(/\/$/, "");

function buildXml() {
  const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const urls = [
    { loc: `${base}/`, changefreq: "daily", priority: "1.0" },
    { loc: `${base}/cropper/flipkart`, changefreq: "weekly", priority: "0.9" },
    { loc: `${base}/cropper/meesho`, changefreq: "weekly", priority: "0.9" },
    { loc: `${base}/about`, changefreq: "monthly", priority: "0.7" },
    { loc: `${base}/tools/gst`, changefreq: "weekly", priority: "0.7" },
  ];

  const rows = urls
    .map(
      (u) => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rows}
</urlset>`;
}

export async function GET() {
  const xml = buildXml();
  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
