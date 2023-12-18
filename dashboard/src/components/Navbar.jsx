import { Box, Button, Stack, useMediaQuery } from "@mui/material";
import React from "react";

import Heading from "../styled/Heading";
import { useDispatch, useSelector } from "react-redux";
import Btn from "../styled/Btn";
import { useNavigate } from "react-router-dom";
import ROUTES from "../static/routes";
import { setLogout } from "../state";
import { toast } from "react-toastify";

const Navbar = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const isAuth = useSelector((state) => state.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          sx={{
            width: "90vw",
            padding: isMobile ? "1rem" : 0,
          }}
          flexWrap={"wrap"}
        >
          <Heading sx={{ color: "#fff" }}>Saral Nation Dashboard</Heading>
          {isAuth ? (
            <Btn
              onClick={() => {
                dispatch(setLogout());
                navigate(ROUTES.LOGIN);
                toast.success('Logged out')
              }}
            >Logout</Btn>
          ) : (
            <Btn
              onClick={() => {
                navigate(ROUTES.LOGIN);
              }}
            >
              Login
            </Btn>
          )}
        </Stack>
      </Box>
    </div>
  );
};

export default Navbar;
