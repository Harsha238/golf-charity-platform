import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
  userId: {
    type: String   // ✅ FIXED (simple)
  },
  name: {
    type: String   // ✅ ADD THIS
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Score", scoreSchema);