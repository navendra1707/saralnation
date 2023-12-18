import express from 'express'
var router = express.Router();

import { checkStatus, getAllTransactions, newPayment } from '../controllers/payment.js';
import { verifyToken } from '../middlewares/auth.js';
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* GET home page. */
//++++++++++++++++++++++++++++++++++++++++++++++++++++++
router.get('/', async function (req, res, next) {
  res.render('index', { page_respond_data: 'Please Pay & Repond From The Payment Gateway Will Come In This Section' });
});

router.post('/pay', newPayment);

router.all('/pay-return-url', checkStatus);

router.post('/transactions', verifyToken, getAllTransactions);

export default router;
