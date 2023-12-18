import { Button, Card, CircularProgress, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import Heading from "../styled/Heading";
import { UPDATE_LINK } from "../endpoints";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const UpdateLink = () => {
  const [link, setLink] = useState("");
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const token = useSelector(state => state.token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${UPDATE_LINK}`, {
        method: 'PUT',
        body: JSON.stringify({
            link,
            price
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await response.json();
    setLoading(false);

    if(response.ok){
        toast.success(data.message);
        setLink('');
        setPrice('');
    }else{
        toast.error(data.message);
    }
  }

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
      <form onSubmit={handleSubmit}>
        <Stack gap={1.5} alignItems={"center"} justifyContent={"center"}>
          <Heading>Update the Contest Form Link</Heading>
          <TextField
            label="Form Link"
            placeholder="Form Link"
            type="text"
            fullWidth
            value={link}
            required
            onChange={(e) => {
              setLink(e.target.value);
            }}
          />
          <TextField
            label="Price (in ₹)"
            placeholder="Price (in ₹)"
            fullWidth
            type="number"
            value={price}
            required
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
          >
            {loading ? <CircularProgress /> : `Update Link`}
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default UpdateLink;
