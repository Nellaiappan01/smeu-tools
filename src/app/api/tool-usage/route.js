import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import ToolUsage from "@/models/ToolUsage";

// 🔹 GET all tool usage logs
export async function GET() {
  try {
    await dbConnect();
    const usage = await ToolUsage.find({});
    return NextResponse.json(usage);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// 🔹 POST to log a tool usage
export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();
    const { tool, period } = body;

    // Default period if not provided
    const usagePeriod = period || "monthly";

    // Check if tool usage already exists for this period
    let log = await ToolUsage.findOne({ tool, period: usagePeriod });
    if (log) {
      log.usage += 1;
      await log.save();
    } else {
      log = await ToolUsage.create({ tool, usage: 1, period: usagePeriod });
    }

    return NextResponse.json({ message: "✅ Tool usage logged", log });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
