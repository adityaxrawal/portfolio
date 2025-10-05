// Simple Express.js server for testing the contact form
// Run this with: node server.js
// Make sure to install dependencies: npm install express cors

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());

// Contact endpoint
app.post("/contact", (req, res) => {
  console.log("📧 New contact form submission:");
  console.log("==========================================");
  console.log("Name:", req.body.name);
  console.log("Email:", req.body.email);
  console.log("Phone:", req.body.phone || "Not provided");
  console.log("Subject:", req.body.subject);
  console.log("Message:", req.body.message);
  console.log("Timestamp:", new Date().toISOString());
  console.log("==========================================\n");

  // Simulate validation
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.subject ||
    !req.body.message
  ) {
    return res.status(400).json({
      message:
        "Missing required fields. Please fill in name, email, subject, and message.",
    });
  }

  // Simulate email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(req.body.email)) {
    return res.status(400).json({
      message: "Please provide a valid email address.",
    });
  }

  // Simulate processing delay (optional)
  setTimeout(() => {
    // Success response
    res.json({
      message: "Message sent successfully! I will get back to you soon.",
      timestamp: new Date().toISOString(),
      id: Math.random().toString(36).substr(2, 9),
    });
  }, 1000); // 1 second delay to simulate processing
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "Server is running!",
    timestamp: new Date().toISOString(),
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Contact form server running on http://localhost:${PORT}`);
  console.log("📝 Endpoints:");
  console.log("   POST /contact - Submit contact form");
  console.log("   GET  /health  - Health check");
  console.log("\n💡 Test the contact form in your React app!");
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down server...");
  process.exit(0);
});
