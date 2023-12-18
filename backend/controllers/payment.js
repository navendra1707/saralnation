import axios from "axios";
import store from "store";
import sha256 from "sha256";
import uniqid from "uniqid";
import Payment from "../models/payment.js";

export const newPayment = async (req, res, next) => {
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //Store IT IN DB ALSO
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const { amount, email, phone, MUID } = req.body;

  let tx_uuid = uniqid();
  store.set("uuid", { tx: tx_uuid });
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++
  let normalPayLoad = {
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: tx_uuid,
    merchantUserId: MUID,
    amount: amount * 100,
    redirectUrl: "http://localhost:3001/pay-return-url/",
    redirectMode: "POST",
    callbackUrl: "http://localhost:3001/pay-return-url/",
    mobileNumber: "9999999999",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  let saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
  let saltIndex = 1;

  let bufferObj = Buffer.from(JSON.stringify(normalPayLoad), "utf8");
  let base64String = bufferObj.toString("base64");

  let string = base64String + "/pg/v1/pay" + saltKey;

  let sha256_val = sha256(string);
  let checksum = sha256_val + "###" + saltIndex;

  const payment = new Payment({
    amount,
    email,
    phone,
    merchantUserId: MUID,
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: tx_uuid,
  });

  await payment.save();

  axios
    .post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        request: base64String,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": checksum,
          accept: "application/json",
        },
      }
    )
    .then(function (response) {
      return res.status(200).json({
        url: response.data.data.instrumentResponse.redirectInfo.url,
      });
    })
    .catch(function (error) {
      res.render("index", { page_respond_data: JSON.stringify(error) });
    });
};

export const checkStatus = async (req, res) => {
  console.log("called");
  if (
    req.body.code == "PAYMENT_SUCCESS" &&
    req.body.merchantId &&
    req.body.transactionId &&
    req.body.providerReferenceId
  ) {
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // 1.In the live please match the amount you get byamount you send also so that hacker can't pass static value.
    // 2.Don't take Marchent ID directly validate it with yoir Marchent ID
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //if (req.body.transactionId == store.get('uuid').tx && req.body.merchantId == 'PGTESTPAYUAT' && req.body.amount == 1000) {
    if (req.body.transactionId) {
      //+++++++++++++++++++++++++++++++++++++++++++++++++++++
      let saltKey = "099eb0cd-02cf-4e2a-8aca-3e6c6aff0399";
      let saltIndex = 1;
      //++++++++++++++++++++++++++++++++++++++++++++++++++++++
      let surl =
        "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/PGTESTPAYUAT/" +
        req.body.transactionId;
      let string =
        "/pg/v1/status/PGTESTPAYUAT/" + req.body.transactionId + saltKey;
      let sha256_val = sha256(string);
      let checksum = sha256_val + "###" + saltIndex;
      axios
        .get(surl, {
          headers: {
            "Content-Type": "application/json",
            "X-VERIFY": checksum,
            "X-MERCHANT-ID": req.body.transactionId,
            accept: "application/json",
          },
        })
        .then(async function (response) {
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //DB OPERATION
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //{PLease add your code.}
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          //RETURN TO VIEW
          //+++++++++++++++++++++++++++++++++++++++++++++++++
          const data = response.data;
          const { success, code } = data;
          const {
            merchantId,
            merchantTransactionId,
            transactionId,
            amount,
            state,
            responseCode,
          } = data.data;
          const {
            type,
            cardType,
            pgTransactionId,
            bankTransactionId,
            pgAuthorizationCode,
            bankId,
            brn,
          } = data.data.paymentInstrument;

          const payment = await Payment.updateOne(
            {
              merchantTransactionId: merchantTransactionId,
            },
            {
              merchantId,
              merchantTransactionId,
              transactionId,
              amount: amount / 100,
              state,
              responseCode,
              paymentType: type,
              cardType,
              pgTransactionId,
              bankTransactionId,
              pgAuthorizationCode,
              bankId,
              brn,
              success,
              code,
              state: success ? "success" : "failed",
            }
          );

          res.redirect("http://localhost:3000/payment-complete");
        })
        .catch(function (error) {
          res.status(500).json({
            message: error.message,
          });
        });
    } else {
      res.status(404).json({
        message: "No transaction ID found",
      });
    }
  } else {
    res.status(404).json({
      message: "Payment Failed",
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const { phone, transactionId, email } = req.body;
    const page = Number(req.query.page) || 1;
    const totalTransactions = await Payment.find().countDocuments();
    const items_per_page = process.env.ITEMS_PER_PAGE;
    const transactions = await Payment.find({
      "$and": [
        { "phone": { $regex: phone } },
        { "email": { $regex: email, $options: 'i' } },
        { "transactionId": { $regex: transactionId, $options: 'i' } }
      ],
    })
      .sort({ createdAt: "descending" })
      .skip((page - 1) * items_per_page) //skip these nnumber of records in the beginning
      .limit(items_per_page);
    res.status(200).json({
      transactions,
      metaData: { totalTransactions, transactionsPerPage: items_per_page },
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
