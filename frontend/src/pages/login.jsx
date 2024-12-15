import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import image from "../assets/people.jpg";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InputAdornment, IconButton, Grid, Alert } from "@mui/material";

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add form validation
    if (!username.trim()) {
      setMessage("Username is required");
      return;
    }
    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        username,
        password,
      });
      const { user } = response.data;
      setMessage("Login successful");
      setIsAuthenticated(true);
      // Redirect based on user type
      if (user.type === "admin") {
        navigate("/adminHome", { state: { username: user.username } });
      } else if (user.type === "user") {
        navigate("/userHome", { state: { username: user.username } });
      } else {
        navigate("/"); // Default redirection
      }
    } catch (error) {
      // Enhanced error messages based on common scenarios
      if (!error.response) {
        setMessage("Network error. Please check your connection.");
      } else {
        setMessage("Invalid username or password. Please try again.");
      }
    }
  };

  const toRegister = () => {
    navigate("/register"); // Navigate to register page
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
            <Box component="form" noValidate onSubmit={handleSubmit}>
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
                onChange={(e) => {
                  setUsername(e.target.value);
                  setMessage(""); // Clear error message when typing
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
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setMessage(""); // Clear error message when typing
                }}
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
              <Button
                type="submit"
                onClick={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">Log In</Typography>
              </Button>
              <Button
                onClick={toRegister}
                fullWidth
                variant="outlined"
                sx={{ mt: 3 }}
              >
                <Typography variant="h6">
                  Are you new here? Register now!
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
