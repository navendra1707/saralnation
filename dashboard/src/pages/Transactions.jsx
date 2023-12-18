import React, { useEffect, useState } from "react";
import PageLayout from "../PageLayout";
import { GET_ALL_TRANSACTIONS } from "../endpoints";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import Heading from "../styled/Heading";
import dayjs from "dayjs";
import { STATUS } from "../static/status";
import { Pagination } from "@mui/material";

const Transactions = () => {
  const token = useSelector((state) => state.token);

  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(30);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const columns = [
    {
      id: "email",
      label: "Email ID",
    },
    {
      id: "phone",
      label: "Phone Number",
    },
    {
      id: "responseCode",
      label: "Status",
    },
    {
      id: "amount",
      label: "Amount",
    },
    {
      id: "updatedAt",
      label: "Date Of Payment",
    },
    {
      id: "merchantTransactionId",
      label: "Merchant Transaction ID",
    },
    {
      id: "transactionId",
      label: "Transaction ID",
    },
  ];

  const fetchTransactions = async (pg) => {
    setLoading(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_ALL_TRANSACTIONS}?page=${pg}`,
      {
        method: "POST",
        body: JSON.stringify({
          transactionId: transactionId,
          phone: phone,
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setTotal(data.metaData.totalTransactions);
    setTransactions((prev) => [...data.transactions]);
  };

  useEffect(() => {
    fetchTransactions(1);
  }, []);

  function findColorStatus(inputString) {
    for (const key in STATUS) {
      if (STATUS[key].text === inputString) {
        return STATUS[key].color;
      }
    }
    return "#000";
  }

  return (
    <PageLayout>
      <Stack
        gap={1}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          margin: "1rem",
        }}
      >
        <Heading>Transactions</Heading>

        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          sx={{ width: "85vw" }}
        >
          <Heading>Search by: </Heading>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
          >
            <TextField
              label="Transaction ID"
              placeholder="Transaction ID"
              type="text"
              value={transactionId}
              onChange={(e) => {
                setTransactionId(e.target.value);
              }}
            />
            <TextField
              label="Email ID"
              placeholder="Email ID"
              type="text"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <TextField
              label="Phone Number"
              placeholder="Phone Number"
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
              }}
            />
            <Button
              variant="contained"
              disabled={loading}
              onClick={fetchTransactions}
            >
              {loading ? <CircularProgress /> : `Search`}
            </Button>
          </Stack>
        </Stack>

        <Paper
          elevation={3}
          sx={{ width: "90%", margin: "0.5rem auto", borderRadius: "0.5rem" }}
        >
          <TableContainer sx={{ overflow: "hidden", borderRadius: "0.5rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      style={{
                        minWidth: 100,
                        backgroundColor: "#1f4d60",
                        overflow: "hidden",
                      }}
                    >
                      {
                        <Typography
                          sx={{
                            fontWeight: "700",
                            fontSize: "15px",
                            inlineSize: "-0.24",
                            color: "#fff",
                          }}
                        >
                          {column.label}
                        </Typography>
                      }
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.length > 0 &&
                  transactions.map((transaction) => {
                    return (
                      <TableRow hover role="checkbox" key={transaction._id}>
                        {columns.map((column) => {
                          let value;
                          switch (column.id) {
                            case "email":
                              value = transaction ? transaction.email : "";
                              break;
                            case "phone":
                              value = transaction ? transaction.phone : "";
                              break;
                            case "transactionId":
                              value = transaction
                                ? transaction.transactionId
                                : "";
                              break;
                            case "responseCode":
                              value = transaction.responseCode
                                ? transaction.responseCode
                                : "PENDING";
                              break;
                            case "amount":
                              value = transaction
                                ? `${transaction.currency}${transaction.amount}`
                                : "";
                              break;
                            case "merchantTransactionId":
                              value = transaction
                                ? transaction.merchantTransactionId
                                : "";
                              break;
                            case "updatedAt":
                              value = transaction
                                ? dayjs(new Date(transaction.updatedAt)).format(
                                    "MMM D, YYYY h:mm A"
                                  )
                                : "";
                              break;
                            default:
                              value = "-";
                          }
                          if (column.id === "responseCode") {
                            return (
                              <TableCell key={column.label} align="center">
                                <Box
                                  display="block"
                                  white-space="nowrap"
                                  overflow="hidden"
                                  text-overflow="ellipsis"
                                  sx={{
                                    fontWeight: 600,
                                    color: findColorStatus(value),
                                  }}
                                >
                                  {value}
                                </Box>
                              </TableCell>
                            );
                          }
                          return (
                            <TableCell key={column.label} align="center">
                              <Box sx={{ fontWeight: 500, color: "#000" }}>
                                {value}
                              </Box>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <Pagination
          count={Math.ceil(total / 30)}
          color="primary"
          onChange={(e, p) => {
            fetchTransactions(p);
            setPage(p);
          }}
          page={page}
        />
      </Stack>
    </PageLayout>
  );
};

export default Transactions;
