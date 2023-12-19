import { Card, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import Heading from "../styled/Heading";
import { useNavigate } from "react-router-dom";

const PageCard = ({ name, image, route }) => {
  const isMobile = useMediaQuery("(max-width: 1000px)");
  const navigate = useNavigate();

  return (
    <Card
      elevation={2}
      sx={{
        minWidth: {
          xs: "75vw",
          md: "20vw",
        },
        minHeight: {
          xs: "40vh",
          md: "30vh",
        },
        padding: "1rem",
        cursor: 'pointer',
        ":hover": {
            boxShadow: '8px 8px 8px 8px rgba(0,0,0,0.5)'
        }
      }}
      onClick = {() => {
        navigate(route)
      }}
    >
      <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
        <img
          src={image}
          alt="logo"
          style={{
            width: isMobile ? "60vw" : "15vw",
            height: isMobile ? "45vw" : "15vw",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <Heading>{name}</Heading>
      </Stack>
    </Card>
  );
};

export default PageCard;
