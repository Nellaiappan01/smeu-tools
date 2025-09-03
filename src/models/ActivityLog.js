import mongoose from "mongoose";

const ActivityLogSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    action: { type: String, required: true }, // "Cropped Flipkart Labels"
    tool: { type: String }, // optional: which tool
  },
  { timestamps: true }
);

export default mongoose.models.ActivityLog ||
  mongoose.model("ActivityLog", ActivityLogSchema);
