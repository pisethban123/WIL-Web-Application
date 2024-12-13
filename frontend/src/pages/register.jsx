import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import image from "../assets/signUp.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton, Alert } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("");

  //  set error states
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassError, setconfrimPassError] = useState("");
  const [fNameError, setfNameError] = useState("");
  const [lNameError, setlNameError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e) => {
    console.log("Form submitted");
    e.preventDefault();
    let hasError = false;

    // Clear previous error message
    setErrorMessage("");
    if (!firstName) {
      setfNameError("First name is required");
      hasError = true;
    } else {
      setfNameError(null);
    }
    if (!lastName) {
      setlNameError("Last name is required");
      hasError = true;
    } else {
      setlNameError(null);
    }
    if (!username) {
      setUsernameError("Username is required");
      hasError = true;
    } else {
      setUsernameError(null);
    }

    if (!password) {
      setPasswordError("Password is required");
      hasError = true;
    } else {
      setPasswordError(null);
    }

    if (!confirmPass) {
      setconfrimPassError("Confirm password is required");
      hasError = true;
    } else if (password !== confirmPass) {
      setconfrimPassError("Passwords do not match");
      hasError = true;
    } else {
      setconfrimPassError(null);
    }

    if (!hasError) {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    // Send the form data to the backend API

    try {
      const response = await axios.post("http://localhost:3001/api/register", {
        username,
        password,
        type,
        firstName,
        lastName,
      });
      if (response.status === 201) {
        const { user } = response.data;
        console.log("User created successfully:", user);
        //navigate to home page after submitting form
        navigate(`/`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message === "Username already exists."
      ) {
        // Handle the username duplication error
        setUsernameError("Username already exists.");
        setErrorMessage(
          "Registration failed. Please try a different username."
        );
      } else {
        // Handle any other errors that occur during the API call
        setErrorMessage(
          "An error occurred during registration. Please try again later."
        );
        console.error("Error creating user:", error);
      }
    }
  };

  const toLogin = () => {
    navigate("/"); // Navigate to login page
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
      sx={{ height: "115vh" }}
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
              Register a new account
            </Typography>
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
                id="firstName"
                label="First Name"
                name="firstName"
                autoFocus
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={fNameError}
                helperText={fNameError}
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
                id="lastName"
                label="Last Name"
                name="lastName"
                autoFocus
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={lNameError}
                helperText={lNameError}
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
                id="username"
                label="Username"
                name="username"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={usernameError}
                helperText={usernameError}
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
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
                name="Confirm password"
                label="Confirm password"
                type="password"
                id="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                error={confirmPassError}
                helperText={confirmPassError}
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">Sign up</Typography>
              </Button>
              <Button
                onClick={toLogin}
                fullWidth
                variant="outlined"
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">
                  Already have an account? Log in now!
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Register;
