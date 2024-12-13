import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import image from "../assets/campaign.jpg";
import Button from "@mui/material/Button";
import { blueGrey } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const CampaignReview = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false); // Dialog visibility
  const [dialogConfig, setDialogConfig] = useState({}); // Dialog configuration

  useEffect(() => {
    if (!id) {
      setError("No campaign ID provided.");
      return;
    }

    const fetchCampaign = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/getCampaignById/${id}`
        );
        if (response.data) {
          setCampaign(response.data);
        } else {
          setError("Campaign not found.");
        }
      } catch (err) {
        console.error("Error fetching campaign details:", err);
        setError("Failed to load campaign details.");
      }
    };

    fetchCampaign();
  }, [id]);

  const handleAction = async () => {
    try {
      if (dialogConfig.action === "approve") {
        const response = await axios.get(
          `http://localhost:3001/api/campaigns/${id}/approve`
        );
        console.log(response.data.message); // Success message from backend
      } else if (dialogConfig.action === "decline") {
        const response = await axios.delete(
          `http://localhost:3001/api/campaigns/${id}/decline`
        );
        console.log(response.data.message); // Success message from backend
      }
      navigate(-1); // Navigate back after the action
    } catch (err) {
      console.error("Error performing action:", err.response || err.message);
    } finally {
      setDialogOpen(false); // Close the dialog
    }
  };

  const openDialog = (actionType) => {
    const config = {
      approve: {
        title: "Confirm Approval",
        message: "Are you sure you want to approve this campaign?",
        action: "approve",
      },
      decline: {
        title: "Confirm Decline",
        message:
          "Are you sure you want to decline this campaign? This action cannot be undone.",
        action: "decline",
      },
    };
    setDialogConfig(config[actionType]);
    setDialogOpen(true);
  };

  if (!campaign) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>Loading campaign details...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 10, justifyContent: "flex-start" }}>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.common.white
              : theme.palette.common.white,
        }}
      >
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mb: 2 }}>
          <Typography variant="body1">Back</Typography>
        </Button>
        {/*Header*/}
        <Grid
          item
          container
          direction="row"
          alignItems="flex-start"
          justifyContent="flex-start"
          xs={6}
          sm={6}
          md={6}
          lg={6}
        >
          <Typography variant="h3">{campaign.title}</Typography>
          <Button
            variant="outlined"
            sx={{ mr: 1, ml: 3, mt: 1.3 }}
            startIcon={<CheckCircleIcon />}
            onClick={() => openDialog("approve")} // Open dialog for approval
          >
            <Typography variant="h7">Approve</Typography>
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 1.3 }}
            color="error"
            startIcon={<CancelIcon />}
            onClick={() => openDialog("decline")} // Open dialog for decline
          >
            <Typography variant="h7">Decline</Typography>
          </Button>
          {/* Reusable Confirmation Dialog */}
          <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)} // Close dialog without action
          >
            <DialogTitle>{dialogConfig.title}</DialogTitle>
            <DialogContent>
              <DialogContentText>{dialogConfig.message}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={handleAction} variant="contained" autoFocus>
                {dialogConfig.action === "approve" ? "Approve" : "Decline"}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <Typography variant="h4" sx={{ color: "grey" }}>
          {campaign.category}
        </Typography>
        <Typography variant="h6" sx={{ color: blueGrey[800] }}>
          Posted by: {campaign.createdBy}
        </Typography>
        <Grid
          item
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
          xs={6}
          sm={6}
          md={6}
          lg={6}
        >
          <Grid
            item
            container
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            xs={6}
            sm={6}
            md={6}
            lg={6}
          >
            <img
              src={image} // Use the imported image
              style={{ width: "50%", height: "50%", marginTop: "20px" }} // Optional styling
            />
          </Grid>
          <Typography variant="h5">{campaign.description}</Typography>
        </Grid>
      </Box>
    </Box>
  );
};

export default CampaignReview;
