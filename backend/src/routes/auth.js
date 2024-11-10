import express from "express"; // Correct ES module import
import { registerUser, loginUser, logout } from "../controllers/authController.js"; // Ensure correct import

const router = express.Router();

router.post("/register", registerUser); // Route to register a user
router.post("/login", loginUser); // Route to find a user by username and login
// Add a logout route
router.post("/logout", logout);  // POST /api/auth/logout

export default router; // Export the router
