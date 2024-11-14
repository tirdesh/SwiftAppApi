const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();

// Initialize MongoDB connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const client = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    cachedDb = client;
    console.log("MongoDB connected");
    return cachedDb;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
}

app.use(express.json());

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api", router);

// Export the app for Vercel
module.exports = app;

// Only listen in development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8008;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
