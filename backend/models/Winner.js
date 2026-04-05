import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  prize: Number,
  drawId: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Winner", winnerSchema);