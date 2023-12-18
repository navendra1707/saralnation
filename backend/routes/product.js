import express from 'express';
import { addNewProduct, deleteProduct, getAllProducts, getProductDetails } from '../controllers/product.js';
import { verifyToken } from '../middlewares/auth.js';

const router = express.Router();

router.get('/get-product-details', getProductDetails);
router.get('/get-all-products', getAllProducts);
router.post('/add-new-product', verifyToken, addNewProduct);
router.delete('/delete-product/:id', deleteProduct);

export default router;