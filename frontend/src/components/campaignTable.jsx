import { useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import image from "../assets/campaign.jpg";
import { Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CampaignReview = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCardClick = (id) => {
    navigate(`/campaignReview/${id}`);
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/campaigns/pending"
        );
        setCampaigns(response.data);
      } catch (err) {
        console.error("Error fetching campaigns:", err);
        setError("Failed to load campaigns. Please try again later.");
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div>
      <Grid
        container
        direction="row"
        spacing={1} // Add spacing between items
      >
        {campaigns.map((campaign) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={campaign._id}>
            <Card sx={{ maxWidth: 400 }}>
              <CardActionArea onClick={() => handleCardClick(campaign._id)}>
                <CardMedia component="img" height="180" image={image} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {campaign.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default CampaignReview;
