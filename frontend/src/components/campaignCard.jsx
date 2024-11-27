import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import image from "../assets/campaign.jpg";

const CampaignCard = () => {
  return (
    <Card sx={{ maxWidth: 400 }}>
      <CardActionArea>
        <CardMedia component="img" height="150" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Campaign
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Description
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CampaignCard;
