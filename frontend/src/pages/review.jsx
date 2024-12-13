import React from "react";
import Button from "@mui/material/Button";
import { CssBaseline, Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/adminHome"); // Navigate to home page
  };

  return (
    <Box sx={{ p: 6, justifyContent: "flex-start" }}>
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
            <Typography variant="h3">Review</Typography>
          </Grid>
        </Grid>
        <Button onClick={toHome} variant="contained" sx={{ mt: 3 }}>
          <Typography variant="h6">Home</Typography>
        </Button>
        <Button onClick={toPost} variant="contained" sx={{ mt: 3, ml: 3 }}>
          <Typography variant="h6">Post</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Review;
