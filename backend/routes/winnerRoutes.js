import express from "express";
import Winner from "../models/Winner.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const winners = await Winner.find()
    .populate("userId", "name")
    .sort({ createdAt: -1 });

  res.json(winners);
});

export default router;