import express from "express";
import Score from "../models/Score.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("SCORE BODY:", req.body);

    const { value, name, userId } = req.body;

    const score = new Score({
      value,
      userId
    });

    await score.save();

    res.json(score);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const scores = await Score.find();
  res.json(scores);
});

export default router;