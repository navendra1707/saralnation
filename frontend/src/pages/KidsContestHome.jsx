import React, { useEffect, useState } from "react";
import PageLayout from "../PageLayout";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
  useMediaQuery,
} from "@mui/material";
import Heading from "../styled/Heading";
import axios from "axios";
import HomeContent from "../components/HomeContent";
import { GET_PRICE } from "../endPoints";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const KidsContestHome = () => {
  const [loading, setLoading] = useState(false);
  const [priceLoading, setPriceLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState(null);

  const isMobileScreen = useMediaQuery("(max-width: 900px)");

  const getPrice = async () => {
    setPriceLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_PRICE}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setPriceLoading(false);
    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setPrice(data.price);
  };

  useEffect(() => {
    getPrice();
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:3001/pay", {
        email: email,
        phone: phone,
        amount: price,
        MUID: "MUID" + Date.now(),
      })
      .then((res) => {
        setLoading(false);
        window.location.href = res.data.url;
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  if (priceLoading) {
    return <Loader />;
  }

  return (
    <PageLayout>
      <Stack
        direction="row"
        alignItems={"center"}
        justifyContent={isMobileScreen ? "center" : "space-evenly"}
        sx={{
          margin: "1rem",
        }}
        flexWrap={"wrap"}
      >
        <HomeContent />
        <Card
          sx={{
            margin: "1rem",
            padding: "1rem",
            width: {
              xs: "75vw",
              md: "20vw",
            },
            minHeight: {
              xs: "40vh",
              md: "30vh",
            },
          }}
          elevation={2}
        >
          <form onSubmit={handlePayment}>
            <Stack gap={1.5} alignItems={"center"} justifyContent={"center"}>
              <Heading>{`Pay ₹${price} to Register`}</Heading>
              <TextField
                label="Phone Number"
                placeholder="Phone Number"
                fullWidth
                type="text"
                value={phone}
                required
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
              <TextField
                label="Email ID"
                placeholder="Email ID"
                type="email"
                fullWidth
                value={email}
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading || !price}
              >
                {loading ? <CircularProgress /> : `Pay ₹${price}`}
              </Button>
            </Stack>
          </form>
        </Card>
      </Stack>
    </PageLayout>
  );
};

export default KidsContestHome;
