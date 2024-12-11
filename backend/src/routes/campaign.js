import express from "express";
import { createCampaign, getAllCampaigns, getCampaignById } from "../controllers/campaignController.js";

const router = express.Router();

// Create a new campaign
router.post("/campaigns", createCampaign);

// Get all campaigns
router.get("/campaigns", getAllCampaigns);

// Get campaign by ID
router.get("/campaigns/:id", getCampaignById);

export default router;