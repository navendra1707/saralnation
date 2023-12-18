import React, { useState } from "react";
import PageLayout from "../PageLayout";
import { Box, Button, Card, CircularProgress, Stack, TextField } from "@mui/material";
import Heading from "../styled/Heading";
import { LOGIN } from "../endpoints";
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    const bodyData = {
        email,
        password
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}${LOGIN}`, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-Type': 'application/json' 
        }
    });
    const data = await response.json();
    setLoading(false);

    if(response.ok){
        dispatch(setLogin({
            user: data.user,
            token: data.token
        }));
        navigate('/');
        toast.success(data.message);
    }else{
        toast.error(data.message)
    }
  }

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
        <Card
          sx={{
            margin: "1rem auto",
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
              <Heading>Login as an Admin</Heading>
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
              <TextField
                label="Password"
                placeholder="Password"
                fullWidth
                type="password"
                value={password}
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
              >
                {loading ? <CircularProgress /> : `Login`}
              </Button>
            </Stack>
          </form>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default Login;
