// src/app/api/test-mongo/route.js
import dbConnect from "@/lib/dbConnect";
import Traffic from "@/models/Traffic";

export async function GET() {
  try {
    await dbConnect();

    // Insert a test traffic log
    await Traffic.create({
      path: "/api/test-mongo",
      ip: "127.0.0.1",
      userAgent: "test-script",
    });

    // Fetch last 5 logs
    const logs = await Traffic.find().sort({ createdAt: -1 }).limit(5);

    return new Response(JSON.stringify({ success: true, logs }), {
      status: 200,
    });
  } catch (err) {
    console.error("❌ Test API error:", err.message);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
    });
  }
}
