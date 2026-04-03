import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema({
  score: {
    type: Number
  },
  name: {
    type: String   // ✅ REQUIRED
  },
  userId: {
    type: String   // ✅ REQUIRED
  },
  amount: {
    type: Number
  },
  date: {
    type: String
  }
});

export default mongoose.model("Winner", winnerSchema);