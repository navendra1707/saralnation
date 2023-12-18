import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GET_ALL_PRODUCTS } from "../endpoints";
import { toast } from "react-toastify";
import { Button, Pagination, Stack, TextField } from "@mui/material";
import ProductItem from "./ProductItem";
import { handleUpdateClick } from "../utils/url";
import Loader from "./Loader";
import SearchIcon from "@mui/icons-material/Search";

const ProductsList = () => {
  const originalUrl = window.location.href;

  const [params] = useSearchParams();
  const [page, setPage] = useState(+params.get("page") || 1);
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(10);
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const getProducts = async () => {
    setLoader(true);
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}${GET_ALL_PRODUCTS}?page=${page}&searchParams=${searchValue}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setLoader(false);

    if (!response.ok) {
      toast.error(data.message);
      return;
    }

    setProducts(data.products);
    setTotal(data.metaData.totalProducts);
  };

  const searchProducts = (e) => {
    e.preventDefault();
    getProducts();
    handleUpdateClick(originalUrl, "page", 1);
    setPage(1);
  };

  useEffect(() => {
    getProducts();
  }, [page]);

  if (loader) return <Loader />;

  return (
    <div>
      <Stack alignItems={"center"} justifyContent={"center"} gap={1}>
        <form onSubmit={searchProducts}>
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            gap={1}
            direction="row"
          >
            <TextField
              label="Search..."
              placeholder="Search..."
              type="text"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <Button
              type="submit"
            >
              <SearchIcon />
            </Button>
          </Stack>
        </form>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={1}
          flexWrap={"wrap"}
          sx={{
            padding: "1rem",
          }}
        >
          {products.length > 0 &&
            products.map((product) => {
              return (
                <ProductItem
                  title={product.title}
                  link={product.link}
                  image={product.imageLink}
                  id={product._id}
                />
              );
            })}
        </Stack>
        <Pagination
          count={Math.ceil(total / 10)}
          color="primary"
          onChange={(e, p) => {
            handleUpdateClick(originalUrl, "page", p);
            setPage(p);
          }}
          page={page}
        />
      </Stack>
    </div>
  );
};

export default ProductsList;
