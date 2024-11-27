import { Grid } from "@mui/material";
import CampaignCard from "./campaignCard";
const Campaigns = () => {
  return (
    <>
      <Grid container direction="row" spacing={2}>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
        <Grid item direction="row">
          <CampaignCard></CampaignCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Campaigns;
