export default function AboutPage() {
  return (
    <section className="relative bg-gradient-to-b from-white via-blue-50/30 to-white py-24">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
          About SMEU E-Commerce Tools
        </h2>

        {/* Divider line */}
        <div className="mt-6 mb-10 w-28 h-1 mx-auto bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />

        {/* Intro paragraph */}
        <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
          SMEU E-Com Tools is built for{" "}
          <span className="font-semibold text-blue-600">online sellers</span> who need 
          <span className="font-semibold text-indigo-600"> fast, accurate, and printer-ready labels</span>.  
          We help streamline order processing, automate GST reports, and track marketplace sales — 
          saving sellers valuable hours every week.
        </p>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-20">
          <div>
            <h4 className="text-4xl font-extrabold text-blue-600">5k+</h4>
            <p className="text-gray-600 text-lg">Labels Cropped</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-indigo-600">1.2k+</h4>
            <p className="text-gray-600 text-lg">Sellers Served</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-blue-600">10+</h4>
            <p className="text-gray-600 text-lg">Tools Coming Soon</p>
          </div>
          <div>
            <h4 className="text-4xl font-extrabold text-indigo-600">99.9%</h4>
            <p className="text-gray-600 text-lg">Uptime Guarantee</p>
          </div>
        </div>

        {/* Glassmorphism Card - Why Choose */}
        <div className="mt-20 flex justify-center">
          <div className="rounded-3xl backdrop-blur-xl bg-white/40 border border-white/30 shadow-2xl max-w-3xl p-10">
            <h3 className="text-3xl font-bold text-blue-600 mb-6">Why Choose SMEU Tools?</h3>
            <ul className="space-y-4 text-lg text-gray-700 text-left">
              <li>⚡ Instant label cropping for faster dispatch</li>
              <li>🖨 Printer-ready PDFs in A4 & thermal formats</li>
              <li>📊 Upcoming GST automation & analytics dashboard</li>
              <li>🌍 Expanding marketplace support: Amazon, Meesho, Myntra</li>
              <li>🔐 Secure, cloud-hosted with near 100% uptime</li>
            </ul>
          </div>
        </div>

        {/* Roadmap */}
        <div className="mt-24 text-left max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-indigo-600 mb-8 text-center">Our Roadmap</h3>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow">
              <h4 className="text-xl font-semibold text-blue-700">Phase 1 — ✅ Label Cropper (Live)</h4>
              <p className="text-gray-600">Flipkart labels cropping tool — already saving sellers hours daily.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow">
              <h4 className="text-xl font-semibold text-blue-700">Phase 2 — 🚧 GST Automation (Coming Soon)</h4>
              <p className="text-gray-600">Generate GST-ready B2B/B2C/HSN reports from marketplace sales data.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow">
              <h4 className="text-xl font-semibold text-blue-700">Phase 3 — 📈 AI Design & Analytics</h4>
              <p className="text-gray-600">Smart analytics + AI design generator for product images and reports.</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 shadow">
              <h4 className="text-xl font-semibold text-blue-700">Phase 4 — 🌍 Marketplace Integrations</h4>
              <p className="text-gray-600">Amazon, Meesho, Myntra integrations with unified dashboard.</p>
            </div>
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-24">
          <a
            href="/"
            className="px-14 py-5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xl shadow-xl hover:shadow-2xl transition"
          >
            Start Using SMEU Tools →
          </a>
        </div>
      </div>

      {/* Subtle glowing background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-200/30 via-indigo-200/30 to-purple-200/20 blur-3xl -z-10" />
    </section>
  );
}
