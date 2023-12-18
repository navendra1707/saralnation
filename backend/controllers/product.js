import cheerio from "cheerio";
import axios from "axios";
import Product from "../models/product.js";

export const getProductDetails = async (req, res) => {
  const { url } = req.query;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      "";
    const image = $('meta[property="og:image"]').attr("content") || "";

    res.json({ title, description, image });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addNewProduct = async (req, res) => {
  try {
    const { link, title, imageLink } = req.body;

    const product = new Product({
      link: link,
      title: title,
      imageLink: imageLink,
    });

    await product.save();

    res.status(201).json({
      product,
      message: "Product Added",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const searchParams = req.query.searchParams || '';
    const totalProducts = await Product.find({ "title": { $regex: searchParams, $options: 'i' } }).countDocuments();
    const items_per_page = 10;
    const products = await Product.find(
      { "title": { $regex: searchParams, $options: 'i' } }
    )
      .sort({ createdAt: "descending" })
      .skip((page - 1) * items_per_page) //skip these nnumber of records in the beginning
      .limit(items_per_page);
    res.status(200).json({
      products,
      metaData: { totalProducts, productsPerPage: items_per_page },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if(!product){
      throw new Error('Product not found');
    }

    await Product.findByIdAndDelete(id);
    res.status(201).json({
      message: "Product deleted",
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
