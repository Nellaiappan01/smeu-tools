import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
