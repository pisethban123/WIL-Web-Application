import React from "react";
import Button from "@mui/material/Button";
import { CssBaseline, Box, Grid, Typography } from "@mui/material";
import CampaignCard from "../components/campaignCard";
import { useNavigate } from "react-router-dom";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const AdminHome = ({ handleLogout }) => {
  const navigate = useNavigate();

  const toReview = () => {
    navigate("/review"); // Navigate to review campaign page
  };

  const username = "test";

  return (
    <Box sx={{ p: 10, justifyContent: "flex-start" }}>
      <CssBaseline />
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
        <Grid container direction="row">
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
            <Typography variant="h3">Welcome {username}!</Typography>
          </Grid>

          <Grid
            item
            container
            direction="column"
            alignItems="flex-end"
            justifyContent="flex-start"
            xs={6}
            sm={6}
            md={6}
            lg={6}
          >
            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ mt: 1, mr: 4 }}
              startIcon={<MeetingRoomIcon />}
            >
              <Typography variant="h7">Log out</Typography>
            </Button>
          </Grid>
        </Grid>

        {/*Review campaign button*/}
        <Button
          type="submit"
          onClick={toReview}
          variant="contained"
          sx={{ mt: 3 }}
        >
          <Typography variant="h6">Review</Typography>
        </Button>

        {/*Campaigns*/}
        <Grid container direction="row" sx={{ marginTop: 5 }}>
          <Grid container spacing={4} xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <CampaignCard />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminHome;
