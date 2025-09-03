import mongoose from "mongoose";

const ToolUsageSchema = new mongoose.Schema(
  {
    tool: { type: String, required: true },
    usage: { type: Number, default: 0 },
    period: { type: String, enum: ["daily", "weekly", "monthly", "yearly"], required: true },
  },
  { timestamps: true }
);

export default mongoose.models.ToolUsage || mongoose.model("ToolUsage", ToolUsageSchema);
