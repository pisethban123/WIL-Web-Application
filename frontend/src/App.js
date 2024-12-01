import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/login";
import AdminHome from "./pages/adminHome";
import UserHome from "./pages/userHome";
import Register from "./pages/register";
import { createTheme, ThemeProvider } from "@mui/material";

const App = () => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., check localStorage or cookies)
    const storedAuth = sessionStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    setUsername(username);
  };

  const handleLogout = async () => {
    try {
      setIsAuthenticated(false);
      sessionStorage.removeItem("isAuthenticated");
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const theme = createTheme({
    typography: {
      fontFamily: ["Outfit", "sans-serif"].join(","),
      h3: {
        fontWeight: 600,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Login
                onLogin={handleLogin}
                setIsAuthenticated={setIsAuthenticated}
              />
            }
          />
          <Route
            path="/adminHome"
            element={<AdminHome handleLogout={handleLogout} />}
          />
          <Route
            path="/userHome"
            element={<UserHome handleLogout={handleLogout} />}
          />
          <Route
            path="/register"
            element={
              <Register
                onCreate={() => {
                  throw new Error("Function not implemented.");
                }}
                onLogout={handleLogout}
              />
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
