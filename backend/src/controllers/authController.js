import User from "../models/user.js"; // Ensure you're importing the User model correctly
import jwt from "jsonwebtoken";

// Function to register a new user
export const registerUser = async (req, res) => {
  console.log("Received registration request");
  try {
    const { username, password, firstName, lastName } = req.body; // Assuming you're sending these in the body
    const type = "user";
    const newUser = new User({ username, password, type, firstName, lastName }); // Include email if necessary
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
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      // In a real app, you should hash the password
      return res.status(400).json({ message: "Invalid credentials" });
    }
    //console.log("found user");
    // Successfully logged in
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
