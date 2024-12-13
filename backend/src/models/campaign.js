import { model, Schema } from "mongoose";

// Define the Campaign schema
const campaignSchema = new Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: String }, // Reference to the User model
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
});

// Create and export the Campaign model
const Campaign = model("Campaign", campaignSchema);
export default Campaign;
