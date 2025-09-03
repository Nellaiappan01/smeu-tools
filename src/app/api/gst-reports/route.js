import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import GSTReport from "@/models/GSTReport";

export async function GET() {
  try {
    await dbConnect();
    const reports = await GSTReport.find({});
    return NextResponse.json(reports);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
