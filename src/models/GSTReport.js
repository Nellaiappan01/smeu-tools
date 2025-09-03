import mongoose from "mongoose";

const GSTReportSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reportName: { type: String, required: true },
    status: { type: String, enum: ["Generated", "Pending"], default: "Generated" },
  },
  { timestamps: true }
);

export default mongoose.models.GSTReport || mongoose.model("GSTReport", GSTReportSchema);
