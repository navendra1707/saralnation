import React from "react";
import PageLayout from "../PageLayout";
import { Box, Button, Stack } from "@mui/material";
import { buttons } from "../static/Buttons";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import UpdateLink from "../components/UpdateLink";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90vw",
          margin: "1rem auto",
        }}
      >
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          <UpdateLink />
          <Stack gap={1} alignItems={"center"} justifyContent={"center"}>
            {buttons.map((b) => {
              return (
                <Button
                  startIcon={b.startIcon}
                  endIcon={<KeyboardArrowRightIcon />}
                  sx={{
                    textTransform: "none",
                    padding: "0.5rem 1.5rem",
                    fontSize: "1.2rem",
                    fontWeight: 550,
                    border: "1px solid #000",
                    minWidth: '20rem',
                    ":hover": {
                      color: "gray",
                      borderRadius: "0.3rem",
                    },
                  }}
                  onClick={() => navigate(b.route)}
                >
                  {b.name}
                </Button>
              );
            })}
          </Stack>
        </Stack>
      </Box>
    </PageLayout>
  );
};

export default Home;
