import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import Traffic from "@/models/Traffic";
import ToolUsage from "@/models/ToolUsage";
import GSTReport from "@/models/GSTReport";

export async function GET() {
  try {
    await dbConnect();

    await User.deleteMany({});
    await Traffic.deleteMany({});
    await ToolUsage.deleteMany({});
    await GSTReport.deleteMany({});

    await User.insertMany([
      { name: "Commander", email: "commander@smeu.com", role: "Admin", status: "Active" },
      { name: "Test User", email: "user@smeu.com", role: "User", status: "Active" }
    ]);

    await Traffic.insertMany([
      { visitors: 50, pageViews: 120 },
      { visitors: 120, pageViews: 340 },
      { visitors: 90, pageViews: 200 }
    ]);

    await ToolUsage.insertMany([
      { tool: "Flipkart Cropper", usage: 200, period: "weekly" },
      { tool: "Meesho Cropper", usage: 80, period: "weekly" },
      { tool: "GST Reports", usage: 50, period: "weekly" },
      { tool: "Price Checker", usage: 120, period: "weekly" },
      { tool: "BG Remover", usage: 20, period: "weekly" }
    ]);

    await GSTReport.insertMany([
      { userId: null, reportName: "Monthly GST Report - August", status: "Generated" },
      { userId: null, reportName: "Monthly GST Report - July", status: "Generated" }
    ]);

    return NextResponse.json({ message: "✅ Seed complete with tool usage + GST reports" });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
