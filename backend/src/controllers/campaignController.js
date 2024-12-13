import Campaign from "../models/campaign.js";

//Function to Create a Campaign
export const createCampaign = async (req, res) => {
  try {
    const { title, category, description, createdBy, status } = req.body;

    const newCampaign = new Campaign({
      title,
      category,
      description,
      createdBy, // Should be the logged-in user's ID
      status,
    });

    await newCampaign.save();

    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating campaign", error: error.message });
  }
};

//Function to Get All Campaigns
export const getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("createdBy", "username"); // Populates the 'createdBy' field with the username
    res.status(200).json(campaigns);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving campaigns", error: error.message });
  }
};

//Function to Get Campaign Details by ID
export const getCampaignById = async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await Campaign.findById(id).populate(
      "createdBy",
      "username"
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving campaign", error: error.message });
  }
};

// Function to get all campaigns with "pending" status
export const getPendingCampaigns = async (req, res) => {
  try {
    // Query campaigns with status "pending"
    const pendingCampaigns = await Campaign.find({ status: "pending" });

    // Respond with the list of pending campaigns
    res.status(200).json(pendingCampaigns);
  } catch (error) {
    // Handle errors during the query
    console.error("Error fetching pending campaigns:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Function to get all campaigns with "pending" status
export const getApprovedCampaigns = async (req, res) => {
  try {
    // Query campaigns with status "pending"
    const approvedCampaigns = await Campaign.find({ status: "approved" });

    // Respond with the list of pending campaigns
    res.status(200).json(approvedCampaigns);
  } catch (error) {
    // Handle errors during the query
    console.error("Error fetching approved campaigns:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Function to update the status of a campaign from "pending" to "approved"
export const approveCampaign = async (req, res) => {
  const { id } = req.params; // Extract campaign ID from request parameters

  try {
    // Find the campaign by ID and update its status to "approved"
    const updatedCampaign = await Campaign.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true } // Return the updated document
    );

    if (!updatedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Respond with the updated campaign
    res.status(200).json({
      message: "Campaign approved successfully",
      campaign: updatedCampaign,
    });
  } catch (error) {
    // Handle errors during the update
    console.error("Error approving campaign:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Function to update the status of a campaign from "pending" to "approved"
export const declineCampaign = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCampaign = await Campaign.findByIdAndDelete(id);

    if (!deletedCampaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    console.error("Error deleting campaign:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
