import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    default: "Player"
  },
  score: {
    type: Number,
    default: 0
  },
  prize: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Winner", winnerSchema);