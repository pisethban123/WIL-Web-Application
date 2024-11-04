/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js"; // Import the auth routes
import { registerUser, findUser } from "./src/controllers/authController.js"; // Import specific functions
import connectDB from "./src/config/db.js";

const app = express();

connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.use("/api", authRoutes); // Use auth routes



export default app; // Export the app for use in other files
