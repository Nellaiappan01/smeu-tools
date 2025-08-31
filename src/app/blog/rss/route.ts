import { posts } from "../../../content/posts";

export async function GET() {
  const siteUrl = "https://yourdomain.com"; // ⚠️ replace with your real domain
  const rssItems = posts.map((post) => `
    <item>
      <title>${post.title}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt}]]></description>
    </item>
  `).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>Smeu E-com tools Blog</title>
      <link>${siteUrl}/blog</link>
      <description>Updates and guides for Flipkart & Meesho sellers</description>
      <language>en</language>
      ${rssItems}
    </channel>
  </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
