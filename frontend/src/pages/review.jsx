import React from "react";
import Button from "@mui/material/Button";
import { CssBaseline, Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CampaignReview from "../components/campaignTable";

const Review = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/adminHome"); // Navigate to home page
  };

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
        {/*Header*/}
        <Button onClick={() => navigate(-1)} variant="outlined" sx={{ mb: 2 }}>
          <Typography variant="body1">Back</Typography>
        </Button>
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
          <Typography variant="h3">Review</Typography>
        </Grid>
        {/*Campaigns*/}
        <Grid container direction="row" sx={{ marginTop: 5 }}>
          <Grid container spacing={4} xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CampaignReview />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Review;
