import React from 'react';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


const Home = ({ handleLogout }) => {

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home Page!</p>
      <Button
                  type="submit"
                  onClick={handleLogout}
                  variant="contained"
                  sx={{ mt: 3 }}
                >
                  <Typography variant="h6">
                    Log out
                  </Typography>
                </Button>
    </div>
  );
};

export default Home;