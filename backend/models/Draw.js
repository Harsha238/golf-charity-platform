import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  amount: Number,

  date: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    default: "upcoming"
  },

  winningNumbers: {
    type: [Number],
    default: []
  },

  players: [
    {
      userId: String,
      numbers: [Number],
      score: Number,
      prize: Number,
      name: String
    }
  ]
});

export default mongoose.model("Draw", drawSchema);