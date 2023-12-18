import {
  Card,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import SubHeading from "../styled/SubHeading";

const ProductItem = ({ title, link, image }) => {

  return (
    <Card
      sx={{
        width: "20rem",
        minHeight: "23rem",
        borderRadius: "0.5rem",
      }}
      elevation={2}
    >
      <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
        {image && (
          <img
            src={image}
            alt='product'
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
      </Stack>
    </Card>
  );
};

export default ProductItem;
