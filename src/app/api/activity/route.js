import { dbConnect } from "@/lib/dbConnect";
import ActivityLog from "@/models/ActivityLog";

export async function GET() {
  await dbConnect();
  const logs = await ActivityLog.find().sort({ createdAt: -1 }).limit(10);
  return Response.json(logs);
}
