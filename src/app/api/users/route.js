import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";   // ✅ match the file name
import User from "@/models/User";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (err) {
    console.error("❌ Users API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
