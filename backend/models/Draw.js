import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  amount: Number,
  date: String,
  status: {
    type: String,
    default: "upcoming" // upcoming | completed
  }
});

export default mongoose.model("Draw", drawSchema);