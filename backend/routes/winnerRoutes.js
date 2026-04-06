import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

// ✅ GET ALL WINNERS
router.get("/", async (req, res) => {
  try {
    const winners = await Winner.find().sort({ date: -1 });
    res.json(winners);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;