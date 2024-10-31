/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
import "dotenv/config";
import express from "express";
/**
 * CORS allow cross-origin requests from frontend
 * Backend run on 3001 and frontend run on 3000
 */
import cors from "cors";

const authRoutes = require("./routes/auth");
const userControllers = require("./src/controllers/user");

const app = express();

app.use(cors());

app.use("/api", authRoutes);
//User
app.post("/api/createUser", userControllers.createUser); // Use the createUser function as middleware for the createUser route

export default app;
