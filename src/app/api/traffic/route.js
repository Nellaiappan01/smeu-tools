import { connectDB } from "@/lib/mongodb";
import Traffic from "@/models/Traffic";

export async function GET() {
  await connectDB();
  const logs = await Traffic.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$timestamp" } },
        visits: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return Response.json(
    logs.map((l) => ({ date: l._id, visits: l.visits }))
  );
}
