import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
} from "../controllers/campaignController.js";

const router = express.Router();

// Create a new campaign
router.post("/createCampaign", createCampaign);

// Get all campaigns
router.get("/getAllCampaigns", getAllCampaigns);

// Get campaign by ID
router.get("/getCampaignById/:id", getCampaignById);

export default router;
