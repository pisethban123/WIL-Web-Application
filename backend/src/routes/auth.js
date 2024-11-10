import express from "express"; // Correct ES module import
import { registerUser, loginUser } from "../controllers/authController.js"; // Ensure correct import

const router = express.Router();

router.post("/register", registerUser); // Route to register a user
router.post("/login", loginUser); // Route to find a user by username

export default router; // Export the router
