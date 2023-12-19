import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";

import paymentRoutes from './routes/payment.js';
import userRoutes from './routes/user.js';
import contestRoutes from './routes/contest.js';
import productRoutes from './routes/product.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use(paymentRoutes)
app.use(userRoutes)
app.use(contestRoutes)
app.use(productRoutes);

const performTask = () => {
  console.log('Task executed at:', new Date());
}

setInterval(performTask, 10*60*1000);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('Connected to Database')
  app.listen(process.env.PORT, () => {
    console.log('Server Started')
  })
})
.catch(err => {
  console.error(err);
})