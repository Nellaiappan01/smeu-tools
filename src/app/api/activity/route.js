import dbConnect from "@/lib/dbConnect"; // ✅ default import

export async function GET() {
  await dbConnect();
  return new Response(JSON.stringify({ ok: true }), { status: 200 });
}
