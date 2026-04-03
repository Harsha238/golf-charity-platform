import mongoose from "mongoose";

const prizeSchema = new mongoose.Schema({
  month: String,
  amount: Number,
});

export default mongoose.model("Prize", prizeSchema);