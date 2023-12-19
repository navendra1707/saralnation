import { Box, Stack, useMediaQuery } from "@mui/material";
import React from "react";

import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Heading from "../styled/Heading";

const Footer = () => {
  const isMobile = useMediaQuery("(max-width: 1000px)");

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
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems="center"
            gap={1}
          >
            <PhoneIcon sx={{ color: "#fff" }} />
            <Heading style={{ color: "#fff" }}>
              <a href="tel:+918817225566">+91-8817225566</a>
            </Heading>
          </Stack>
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems="center"
            gap={1}
          >
            <EmailIcon sx={{ color: "#fff" }} />
            <Heading style={{ color: "#fff" }}>
              <a href="mailto:thebraintrain.jbp@gmail.com">
                thebraintrain.jbp@gmail.com
              </a>
            </Heading>
          </Stack>
          <Stack
            direction="row"
            justifyContent={"center"}
            alignItems="center"
            gap={1}
          >
            <LocationOnIcon sx={{ color: "#fff" }} />
            <Heading style={{ color: "#fff" }}>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://maps.app.goo.gl/AH7QCdSP6ej3N7778"
              >
                Madan Mahal
              </a>
            </Heading>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

export default Footer;
