const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");

const app = express();

// Initialize MongoDB connection with retry logic
const connectDB = async (retries = 5) => {
  while (retries) {
    try {
      await mongoose.connect(
        process.env.MONGODB_URI ||
          "mongodb+srv://info6150user:admin@info6150fall2023.ijcaexm.mongodb.net/switfApp?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        }
      );
      console.log("MongoDB connected successfully");
      return true;
    } catch (err) {
      console.error(`Connection attempt ${6 - retries} failed:`, err.message);
      retries -= 1;
      if (!retries) throw err;
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

app.use(express.json());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API is running" });
});

// API routes
app.use("/api", router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 8008;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Connect to MongoDB
connectDB().catch(console.error);

// Export for Vercel
module.exports = app;
