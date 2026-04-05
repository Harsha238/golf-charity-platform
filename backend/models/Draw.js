import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  amount: Number,

  date: {
    type: Date,
    default: Date.now
  },

  status: {
    type: String,
    enum: ["upcoming", "completed"],
    default: "upcoming"
  },

  winningNumbers: [Number],

  players: [
    {
      userId: String,
      numbers: [Number],
      score: Number,
      prize: Number
    }
  ]
});

export default mongoose.model("Draw", drawSchema);