import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import Login from "./pages/login";
import Home from "./pages/home";
import Register from "./pages/register";

const App = () => {
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    setUsername(username);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/logout", {
        username: username,
      });

      if (response.status === 200) {
        console.log("Logout successful");
        setIsAuthenticated(false);
        navigate("/");
      } else {
        console.log("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Home username={username} onLogout={handleLogout} />
            ) : (
              <Login
                onLogin={handleLogin}
                setIsAuthenticated={setIsAuthenticated}
              />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Login
                onLogin={handleLogin}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/" state={{ showAlert: true }} />
            )
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Register
                onCreate={() => {
                  throw new Error("Function not implemented.");
                }}
                onLogout={handleLogout}
              />
            ) : (
              <Navigate to="/" state={{ showAlert: true }} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
