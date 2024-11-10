/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import express from "express";
import cors from "cors";
import session from "express-session"; // Import express-session
import authRoutes from "./src/routes/auth.js"; // Import the auth routes
import connectDB from "./src/config/db.js";

const app = express();
const port = 3001;

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Session middleware setup
app.use(session({
  secret: process.env.SESSION_SECRET || "your-secret-key", // Secret key for signing the session ID cookie
  resave: false, // Do not force session to be saved back to the store
  saveUninitialized: false, // Do not save uninitialized sessions
  cookie: { secure: false, maxAge: 3600000 } // Max age for session cookie (1 hour), set `secure: true` for HTTPS
}));

// Routes
app.use("/api", authRoutes); // Use auth routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app; // Export the app for use in other files