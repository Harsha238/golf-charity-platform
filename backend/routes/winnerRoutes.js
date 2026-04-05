import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

// GET WINNERS
router.get("/", async (req, res) => {
  const winners = await Winner.find().sort({ _id: -1 });
  res.json(winners);
});

export default router;