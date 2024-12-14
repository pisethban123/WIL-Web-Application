/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js"; // Import the auth routes
import campaignRoutes from "./src/routes/campaign.js";
import connectDB from "./src/config/db.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
// Routes
app.use("/api", authRoutes); // Use auth routes
app.use("/api", campaignRoutes); // Use campaign routes

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app; // Export the app for use in other files
