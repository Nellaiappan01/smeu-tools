import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
