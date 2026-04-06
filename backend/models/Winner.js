import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  userId: String,
  name: String,
  score: Number,
  prize: Number,
  date: Date
});

export default mongoose.model("Winner", winnerSchema);