import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import image from "../assets/campaign.jpg";
import Button from "@mui/material/Button";

const CampaignDetails = () => {
  const { id } = useParams(); // Get the campaign ID from the URL
  const [campaign, setCampaign] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
        <Grid item>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            sx={{ mt: 3 }}
          >
            <Typography variant="body1">Back</Typography>
          </Button>
        </Grid>
        {/*Header*/}
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
          <Typography variant="h3">
            {campaign.title} - {campaign.category}
          </Typography>
        </Grid>

        {/*Review campaign button*/}
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
          <Typography variant="h6">{campaign.createdBy}</Typography>
        </Grid>
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

export default CampaignDetails;
