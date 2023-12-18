import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubHeading from "../styled/SubHeading";
import Heading from "../styled/Heading";
import { DELETE_PRODUCT } from "../endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductItem = ({ title, link, image, id }) => {
  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const deleteProduct = async () => {
    setLoader(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${DELETE_PRODUCT}/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    setLoader(false);
    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);
    navigate(0);
  };

  return (
    <Card
      sx={{
        width: "20rem",
        minHeight: "25rem",
        borderRadius: "0.5rem",
      }}
      elevation={2}
    >
      <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
        {image && (
          <img
            src={image}
            style={{
              width: "20rem",
              height: "15rem",
              objectFit: "contain",
              objectPosition: "center",
              overflow: "hidden",
            }}
          />
        )}
        <Typography style={{ padding: "0 0.5rem", fontWeight: 550 }}>
          {title.length > 50 ? `${title.slice(0, 50)}...` : title}
        </Typography>
        <SubHeading sx={{ padding: "0 0.5rem" }}>
          <a
            href={link}
            rel="noreferrer"
            target="_blank"
            style={{ textDecoration: "none", color: "#0096FF" }}
          >
            {link.length > 25 ? `${link.slice(0, 25)}...` : link}
          </a>
        </SubHeading>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
          sx={{ textTransform: "none", margin: "0 0.5rem" }}
        >
          Delete Product
        </Button>
      </Stack>
      <Dialog fullWidth open={open} onClose={() => setOpen(false)}>
        <Stack alignItems={"center"} justifyContent={"center"} gap={1} p={2}>
          <Heading>Are you sure?</Heading>
          <Stack
            alignItems={"center"}
            direction={"row"}
            justifyContent={"center"}
            gap={1}
          >
            <Button
              variant="contained"
              disabled={loader}
              sx={{ textTransform: "none", margin: "0 0.5rem" }}
              onClick={deleteProduct}
            >
              {loader ? <CircularProgress /> : "Delete"}
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
              sx={{ textTransform: "none", margin: "0 0.5rem" }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Dialog>
    </Card>
  );
};

export default ProductItem;
