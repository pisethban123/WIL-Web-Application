/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.js"; // Import the auth routes
import connectDB from "./src/config/db.js";

const app = express();
const port = 3001;
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Routes
app.use("/api", authRoutes); // Use auth routes
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
export default app; // Export the app for use in other files
