import { Box, Stack, Button } from "@mui/material";
import React from "react";

import WestIcon from "@mui/icons-material/West";

import Heading from "../styled/Heading";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Box
        sx={{
          minHeight: "10vh",
          backgroundColor: "#1f4d60",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          flexWrap={"wrap"}
          sx={{
            width: '90vw'
          }}
        >
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            <WestIcon sx={{ color: "#fff" }} />
          </Button>
          <Heading
            sx={{ cursor: "pointer", color: '#fff', fontSize: '1.2rem' }}
            onClick={() => {
              navigate("/");
            }}
          >
            Saral Nation
          </Heading>
        </Stack>
      </Box>
    </div>
  );
};

export default Navbar;
