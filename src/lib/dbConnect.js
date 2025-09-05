import mongoose from "mongoose";

let isConnected = false; // connection state

async function dbConnect() {
  if (isConnected) return;

  if (!process.env.MONGODB_URI) {
    throw new Error("⚠️ Please define the MONGODB_URI env variable");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "smeu", // optional: use your DB name
      bufferCommands: false,
    });

    isConnected = db.connections[0].readyState === 1;
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

export default dbConnect; // ✅ default export
