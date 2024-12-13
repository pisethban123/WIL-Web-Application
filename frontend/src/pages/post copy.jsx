import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import image from "../assets/people.jpg";

const Post = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("");

  //  set error states
  const [errorMessage, setErrorMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { username } = location.state;
  //const { user } = useContext(UserContext);

  const handleSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    let hasError = false;

    // Clear previous error message
    setErrorMessage("");
    if (!title) {
      setErrorMessage("This required field is empty");
      hasError = true;
    } else {
      setErrorMessage(null);
    }
    if (!description) {
      setErrorMessage("This required field is empty");
      hasError = true;
    } else {
      setErrorMessage(null);
    }
    if (!title) {
      setErrorMessage("This required field is empty");
      hasError = true;
    } else {
      setErrorMessage(null);
    }
    if (!hasError) {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    // Send the form data to the backend API
    try {
      const response = await axios.post(
        "http://localhost:3001/api/createCampaign",
        {
          title,
          category,
          description,
          createdBy: username,
          status: "active",
        }
      );
      console.log("post username", username);
      if (response.status === 201) {
        const { campaign } = response.data;
        console.log("Campaign created successfully:", campaign);
        //navigate to home page after submitting form
        navigate(`/`);
      }
    } catch (error) {
      // Handle any other errors that occur during the API call
      setErrorMessage("An error occurred. Please try again later.");
      console.log(error);
    }
  };

  const toCampaignDetails = () => {
    navigate("/userHome"); // Navigate to home page
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
        sx={{
          mb: "10%",
          mr: "4%",
          ml: "4%",
          backgroundColor: "##F1F0F0",
        }}
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
              Log in to your account
            </Typography>
            {/* Add error message Alert */}
            {message && (
              <Alert
                severity={message === "Login successful" ? "success" : "error"}
                sx={{ mt: 2, mb: 2 }}
              >
                {message}
              </Alert>
            )}
            <Grid container component="main" alignContent="center">
              <Box sx={{ p: 10, mt: 3 }}>
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
                  <Typography variant="h3">Post a campaign</Typography>
                </Grid>

                {/* Add error message Alert */}
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
                    error={errorMessage}
                    helperText={errorMessage}
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
                    id="category"
                    label="Category"
                    name="Category"
                    autoFocus
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    error={errorMessage}
                    helperText={errorMessage}
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
                    autoFocus
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    error={errorMessage}
                    helperText={errorMessage}
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
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Post;
