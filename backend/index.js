import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";

// Initialize Express
const app = express();

// Basic Middleware
app.use(bodyParser.json()); // For file uploads
app.use(express.json());
app.use(cors()); // Open CORS for testing

// Routes
app.use("/api/user", userRoutes);

// Health Check
app.get("/", (req, res) => {
  res.send("InternTrack API is running");
});

// Database Connection
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Test create endpoint: POST http://localhost:${PORT}/api/user`);
    });
  })
  .catch((error) => {
    console.error("DB connection failed:", error.message);
  });