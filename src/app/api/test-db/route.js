import dbConnect from "@/lib/dbConnect";

export async function GET() {
  try {
    await dbConnect();
    return new Response(JSON.stringify({ ok: true, msg: "✅ Database connected" }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), { status: 500 });
  }
}
