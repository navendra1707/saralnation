import mongoose from "mongoose";

const ContestSchema = new mongoose.Schema({
    link: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    }
});

const Contest = mongoose.model('Contest', ContestSchema);
export default Contest;