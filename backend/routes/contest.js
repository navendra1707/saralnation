import express from 'express'
import { verifyToken } from '../middlewares/auth.js';
import { getLink, getPrice, updateLink } from '../controllers/contest.js';

const router = express.Router();

router.put('/update-link', verifyToken, updateLink);
router.get('/get-price', getPrice);
router.get('/get-link', getLink);

export default router;