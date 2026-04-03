import express from "express";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";
import Score from "../models/Score.js";

const router = express.Router();

// ✅ CREATE DRAW → UPCOMING
router.post("/create", async (req, res) => {
  try {
    const { amount } = req.body;

    const draw = new Draw({
      amount,
      date: new Date().toISOString().split("T")[0],
      status: "upcoming"
    });

    await draw.save();

    res.json(draw);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL DRAWS
router.get("/", async (req, res) => {
  try {
    const draws = await Draw.find().sort({ _id: -1 });
    res.json(draws);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ RUN DRAW → CREATE WINNER + MARK COMPLETED
router.post("/run/:id", async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);

    if (!draw) {
      return res.status(404).json({ error: "Draw not found" });
    }

    // ✅ PREVENT RUNNING AGAIN
    if (draw.status === "completed") {
      return res.status(400).json({ error: "Draw already completed" });
    }

    const scores = await Score.find();

    if (scores.length === 0) {
      return res.status(400).json({ error: "No scores available" });
    }

    // ✅ highest score winner
    const top = scores.sort((a, b) => b.value - a.value)[0];

    const winner = new Winner({
      score: top.value,
      userId: top.userId,
      name: top.name,
      amount: draw.amount,
      date: draw.date
    });

    await winner.save();

    // ✅ update draw status
    draw.status = "completed";
    await draw.save();

    // ✅ RETURN UPDATED DATA
    res.json({
      message: "Draw completed successfully",
      draw,
      winner
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/clear", async (req, res) => {
  try {
    await Winner.deleteMany({});
    await Draw.deleteMany({});
    await Score.deleteMany({});

    res.send("All data cleared ✅");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;