import { Box, Stack } from "@mui/material";
import React from "react";
import data from "../static";
import PageCard from "../components/PageCard";
import PageLayout from "../PageLayout";

const Home = () => {
  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack
          direction={"row"}
          gap={2}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            margin: "1rem auto",
            width: "90vw",
          }}
        >
          {data.map((d) => {
            return <PageCard name={d.name} image={d.image} route={d.route} />;
          })}
        </Stack>
      </Box>
    </PageLayout>
  );
};

export default Home;
