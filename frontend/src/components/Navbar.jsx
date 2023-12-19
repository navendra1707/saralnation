import React from "react";
import { Box, Button, Grid } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import Heading from "../styled/Heading";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "10vh",
        backgroundColor: "#1f4d60",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container justifyContent="space-between" alignItems="center" sx={{ width: '90vw' }}>
        <Grid item xs={3}>
          <Button onClick={() => navigate(-1)}>
            <WestIcon sx={{ color: "#fff" }} />
          </Button>
        </Grid>
        <Grid item xs={6} textAlign="center">
          <Heading
            sx={{ cursor: "pointer", color: "#fff", fontSize: "1.2rem" }}
            onClick={() => navigate("/")}
          >
            Saral Nation
          </Heading>
        </Grid>
        <Grid item xs={3} />
        {/* You can adjust the xs values to control the width of the center column */}
      </Grid>
    </Box>
  );
};

export default Navbar;
