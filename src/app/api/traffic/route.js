import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Traffic from "@/models/Traffic";

export async function GET() {
  try {
    await dbConnect();
    const traffic = await Traffic.find({}).sort({ date: -1 }).limit(30);
    return NextResponse.json(traffic);
  } catch (err) {
    console.error("❌ Traffic API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
