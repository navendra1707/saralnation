import {
  Button,
  Card,
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import Heading from "../styled/Heading";
import { useState } from "react";
import { GET_PRODUCT_DETAILS, ADD_NEW_PRODUCT } from "../endpoints";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [linkLoader, setLinkLoader] = useState(false);
  const [loader, setLoader] = useState(false);

  const token = useSelector(state => state.token);
  const navigate = useNavigate();

  const addNewProduct = async (e) => {
    e.preventDefault();

    setLoader(true);
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${ADD_NEW_PRODUCT}`, {
        body: JSON.stringify({
            link,
            title,
            imageLink
        }),
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    setLoader(false);

    if(!response.ok){
        toast.error(data.message);
        return;
    }

    toast.success(data.message);
    setLink('');
    setTitle('');
    setImageLink('');
    navigate(0);
  }

  const getDetails = async () => {
    setLinkLoader(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_PRODUCT_DETAILS}?url=${link}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setLinkLoader(false);

    if (!response.ok) {
      return;
    }
    setTitle(data.title);
  };

  useEffect(() => {
    if(link)getDetails();
  }, [link]);

  return (
    <Card
      sx={{
        padding: "1rem",
        width: {
          xs: "75vw",
          md: "30vw",
        },
        minHeight: {
          xs: "40vh",
          md: "30vh",
        },
      }}
      elevation={2}
    >
      <form onSubmit={addNewProduct}>
        <Stack gap={1.5} alignItems={"center"} justifyContent={"center"}>
          <Heading>Add a new product</Heading>
          <TextField
            label="Product Link"
            placeholder="Product Link"
            type="text"
            fullWidth
            value={link}
            required
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <TextField
            label="Title"
            placeholder="Title"
            fullWidth
            type="text"
            value={title}
            required
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          {linkLoader && (
            <Stack
              direction={"row"}
              justifyContent={"flex-end"}
              sx={{ width: "100%" }}
            >
              <CircularProgress size={"1.2rem"} />
            </Stack>
          )}
          <TextField
            label="Image"
            placeholder="Image Link"
            fullWidth
            type="text"
            value={imageLink}
            required
            onChange={(e) => {
              setImageLink(e.target.value);
            }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loader}
            sx={{ textTransform: "none" }}
          >
            {loader ? <CircularProgress /> : `Add Product`}
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default AddProduct;
