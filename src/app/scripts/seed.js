// scripts/seed.js
import dbConnect from "../lib/dbConnect.js";
import User from "../models/User.js";
import Traffic from "../models/Traffic.js";

async function seed() {
  try {
    await dbConnect();

    // Clear old data
    await User.deleteMany({});
    await Traffic.deleteMany({});

    // Insert Users
    await User.insertMany([
      { name: "Commander", email: "commander@smeu.com", role: "Admin", status: "Active" },
      { name: "Test User", email: "user@smeu.com", role: "User", status: "Active" }
    ]);

    // Insert Traffic
    await Traffic.insertMany([
      { visitors: 50, pageViews: 120 },
      { visitors: 120, pageViews: 340 },
      { visitors: 90, pageViews: 200 }
    ]);

    console.log("✅ Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding error:", err);
    process.exit(1);
  }
}

seed();
     