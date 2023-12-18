import { Box, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import homeBanner from "../static/homeBanner.jpg";
import Heading from "../styled/Heading";
import { features } from "../static";
import ListItem from "./ListItem";

const HomeContent = () => {
  const isMobileScreen = useMediaQuery("(max-width: 900px)");

  return (
    <Box>
      <Stack alignItems={"center"} justifyContent={"center"} gap={2}>
        <Heading>
          The Brain Train National Level Kids Contest
        </Heading>
        <Stack
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={'center'}
          direction='row'
          gap={2}
        >
          <img
            src={homeBanner}
            alt="banner"
            style={{
              width: isMobileScreen ? "90vw" : "40vw",
              height: "auto",
            }}
          />
          <Stack gap={1}>
            <Heading>Win Gifts / Cash prizes upto ₹11000</Heading>
            <Heading>Age Group: 0 to 15 Years</Heading>
            <Heading sx={{color: '#0d92a5'}}>Attractive Features: </Heading>
            {
                features.map(feature => {
                    return <ListItem item={feature} />
                })
            }
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default HomeContent;
