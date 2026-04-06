import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

// ✅ GET ALL WINNERS
router.get("/", async (req, res) => {
  try {
    const winners = await Winner.find();

    console.log("WINNERS FROM DB:", winners); // 👈 DEBUG

    res.json(winners);
  } catch (err) {
    console.log("ERROR FETCHING WINNERS:", err);
    res.status(500).json(err.message);
  }
});

export default router;