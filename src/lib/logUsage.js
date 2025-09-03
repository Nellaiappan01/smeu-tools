export async function logUsage(tool, period = "monthly") {
  try {
    await fetch("/api/tool-usage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tool, period }),
    });
  } catch (err) {
    console.error("❌ Failed to log usage:", err);
  }
}
