import React, { useEffect, useState } from "react";
import PageLayout from "../PageLayout";
import Heading from "../styled/Heading";
import { GET_LINK } from "../endPoints";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { Box, Card, Stack } from "@mui/material";
import SubHeading from "../styled/SubHeading";

const ContestForm = () => {
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const getLink = async () => {
    setLoading(true);

    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_LINK}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setLink(data.link);
  };

  useEffect(() => {
    getLink();
  }, []);

  if (loading) return <Loader />;

  return (
    <PageLayout>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          margin: "1rem",
        }}
      >
        <Card
          elevation={2}
          sx={{
            borderRadius: "0.5rem",
            padding: "1rem",
            width: "100%",
          }}
        >
          <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
            <Heading>Fill the form to register for the contest:</Heading>
            <SubHeading
              sx={{color: '#0096FF'}}
            >
              <a
                href={link}
                rel="noreferrer"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                {link}
              </a>
            </SubHeading>
          </Stack>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default ContestForm;
