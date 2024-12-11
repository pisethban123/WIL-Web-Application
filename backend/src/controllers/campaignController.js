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

    res.status(201).json({ message: "Campaign created successfully", campaign: newCampaign });
  } catch (error) {
    res.status(500).json({ message: "Error creating campaign", error: error.message });
  }
};

//Function to Get All Campaigns
export const getAllCampaigns = async (req, res) => {
    try {
      const campaigns = await Campaign.find().populate("createdBy", "username"); // Populates the 'createdBy' field with the username
      res.status(200).json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving campaigns", error: error.message });
    }
  };
  
//Function to Get Campaign Details by ID
  export const getCampaignById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const campaign = await Campaign.findById(id).populate("createdBy", "username");
  
      if (!campaign) {
        return res.status(404).json({ message: "Campaign not found" });
      }
  
      res.status(200).json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving campaign", error: error.message });
    }
  };