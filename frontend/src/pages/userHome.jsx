import React from "react";
import Button from "@mui/material/Button";
import { CssBaseline, Box, Grid, Typography } from "@mui/material";
import Campaigns from "../components/campaignArea";

const UserHome = ({ handleLogout }) => {
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
        <Grid container direction="row">
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
            <Typography variant="h3">Welcome User!</Typography>
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
              type="submit"
              onClick={handleLogout}
              variant="contained"
              sx={{ mt: 3 }}
            >
              <Typography variant="h6">Log out</Typography>
            </Button>
          </Grid>
        </Grid>

        <Grid container direction="row" sx={{ marginTop: 5 }}>
          {/*Button Area*/}
          <Grid container spacing={4} xs={12} sm={12} md={12} lg={12}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Campaigns />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserHome;
