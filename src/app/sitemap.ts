import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://smeutools.vercel.app";

  return [
    { url: base, lastModified: new Date(), changefreq: "weekly", priority: 1.0 },
    { url: `${base}/cropper/flipkart`, lastModified: new Date(), changefreq: "weekly", priority: 0.9 },
    { url: `${base}/cropper/meesho`, lastModified: new Date(), changefreq: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changefreq: "monthly", priority: 0.7 },
    { url: `${base}/tools/gst`, lastModified: new Date(), changefreq: "weekly", priority: 0.7 },
  ];
}
