import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    success: {
        type: Boolean,
        required: true,
        default: false
    },
    code: {
        type: String
    },
    responseCode: {
        type: String
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    merchantId: {
        type: String,
        required: true
    },
    merchantUserId: {
        type: String
    },
    merchantTransactionId: {
        type: String,
    },
    transactionId: {
        type: String
    },
    amount: {
        type: Number,
    },
    currency: {
        type: String,
        required: true,
        default: '₹'
    },
    cardType: {
        type: String
    },
    paymentMode: {
        type: String
    },
    state: {
        type: String,
        default: 'pending'
    },
    pgTransactionId: String,
    bankTransactionId: String,
    pgAuthorizationCode: String,
    bankId: String,
    brn: String
}, {
    timestamps: true
});

const Payment = mongoose.model('Payment', PaymentSchema);
export default Payment;