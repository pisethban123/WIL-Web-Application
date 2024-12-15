import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Alert,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import image from "../assets/post.jpg";

const Post = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [openReviewDialog, setOpenReviewDialog] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Clear previous error messages
    setErrorMessage("");

    if (!title || !category || !description) {
      setErrorMessage("All fields are required.");
      return;
    }
  };

  const handleConfirm = async () => {
    setOpenConfirmDialog(true);
  };

  const Background = styled("div")({
    position: "absolute",
    width: "60%",
    height: "90%",
    backgroundImage: `url(${image})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    top: "5%",
  });

  return (
    <Grid
      container
      component="main"
      alignContent="center"
      alignItems="baseline"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      <CssBaseline />
      <Grid
        item
        md={7}
        lg={7}
        sx={{ display: { xs: "none", sm: "none", md: "block" } }}
      >
        <Background />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        lg={4}
        position="relative"
        sx={{ mb: "10%", mr: "4%" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          <Box sx={{ alignItems: "left", mt: 3 }}>
            <Typography component="h1" variant="h6" fontSize={25}>
              Post a Campaign
            </Typography>
            {errorMessage && (
              <Alert severity="error" sx={{ mt: 2, mb: 2, width: "100%" }}>
                {errorMessage}
              </Alert>
            )}
            <Box component="form" noValidate onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "blue",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="category"
                label="Category"
                name="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "blue",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  "& label.Mui-focused": {
                    color: "blue",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "blue",
                    },
                    "&:hover fieldset": {
                      borderColor: "blue",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "blue",
                    },
                  },
                }}
              />
              <Grid
                container
                direction="row"
                alignItems="flex-end"
                justifyContent="flex-end"
              >
                <Grid item>
                  <Button
                    onClick={() => navigate(-1)}
                    variant="outlined"
                    sx={{ mt: 3, mr: 1 }}
                  >
                    <Typography variant="h6">Cancel</Typography>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    onClick={handleConfirm}
                    variant="contained"
                    sx={{ mt: 3 }}
                  >
                    <Typography variant="h6">Post</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Dialog
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      >
        <DialogTitle>Confirm Post</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to post this campaign?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDialog(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={async () => {
              // Proceed to handle the campaign post
              try {
                const response = await axios.post(
                  "http://localhost:3001/api/createCampaign",
                  {
                    title,
                    category,
                    description,
                    createdBy: username,
                    status: "pending",
                  }
                );
                if (response.status === 201) {
                  setOpenConfirmDialog(false); // Close the first dialog
                  setOpenReviewDialog(true); // Open the second dialog
                }
              } catch (error) {
                setErrorMessage("An error occurred. Please try again later.");
                console.log(error);
              }
            }}
            color="primary"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openReviewDialog}
        onClose={() => setOpenReviewDialog(false)}
      >
        <DialogTitle>Campaign Under Review</DialogTitle>
        <DialogContent>
          <Typography>
            Your campaign is currently under review and awaiting approval from
            the admin.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenReviewDialog(false);
              navigate("/userhome", { state: { username: username } });
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default Post;
