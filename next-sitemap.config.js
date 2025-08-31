/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://localhost:3002/", // ⚠️ Replace with your domain
  generateRobotsTxt: true,
  sitemapSize: 5000,
  changefreq: "daily",
  priority: 0.7,
};
