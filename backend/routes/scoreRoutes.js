import express from "express";
import Score from "../models/Score.js";
import Draw from "../models/Draw.js";

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

router.post("/submit", async (req, res) => {
  const { userId, name, numbers, drawId } = req.body;

  // save score (optional)
  const score = new Score({ userId, name, value: numbers.length });
  await score.save();

  // ✅ ADD PLAYER TO DRAW
  const draw = await Draw.findById(drawId);

  draw.players.push({
    userId,
    name,
    numbers
  });

  await draw.save();

  res.json({ message: "Joined draw", draw });
});

router.get("/", async (req, res) => {
  const scores = await Score.find();
  res.json(scores);
});

export default router;