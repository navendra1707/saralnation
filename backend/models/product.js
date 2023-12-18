import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    imageLink: String
}, {
    timestamps: true
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;