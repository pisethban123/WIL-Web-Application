import User from "../models/user.js"; // Ensure you're importing the User model correctly
import jwt from "jsonwebtoken";

// Function to register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body; // Assuming you're sending these in the body
    const newUser = new User({ username, password, email }); // Include email if necessary
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to find a user
export const loginUser = async (req, res) => {
  try {
    const { username } = req.params; // Assuming username is passed as a URL parameter
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "Incorrect username" });
    }
    if (password !== user.password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", details: error.message });
  }
};
