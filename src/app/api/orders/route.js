import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function GET() {
  await dbConnect();
  const orders = await Order.find({});
  return Response.json(orders);
}
