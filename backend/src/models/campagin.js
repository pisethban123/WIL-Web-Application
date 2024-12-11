import { model, Schema } from "mongoose";

// Define the Campaign schema
const campaignSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the User model
    dateTime: { type: Date, default: Date.now }, // Automatically set the creation time
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Create and export the Campaign model
const Campaign = model("Campaign", campaignSchema);
export default Campaign;
