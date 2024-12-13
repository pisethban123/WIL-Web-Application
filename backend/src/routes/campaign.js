import express from "express";
import {
  createCampaign,
  getAllCampaigns,
  getCampaignById,
  getPendingCampaigns,
  getApprovedCampaigns,
  approveCampaign,
  declineCampaign,
} from "../controllers/campaignController.js";

const router = express.Router();

// Create a new campaign
router.post("/createCampaign", createCampaign);

// Get all campaigns
router.get("/getAllCampaigns", getAllCampaigns);

// Get campaign by ID
router.get("/getCampaignById/:id", getCampaignById);

// Route to get all pending campaigns
router.get("/campaigns/pending", getPendingCampaigns);

// Route to get all approved campaigns
router.get("/campaigns/approved", getApprovedCampaigns);

// Route to update campaign status from pending to approve
router.get("/campaigns/:id/approve", approveCampaign);

// Route to update campaign status from pending to approve
router.delete("/campaigns/:id/decline", declineCampaign);

export default router;
