import mongoose from "mongoose";

const TrafficSchema = new mongoose.Schema({
  visitors: { type: Number, default: 0 },
  pageViews: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Traffic || mongoose.model("Traffic", TrafficSchema);
