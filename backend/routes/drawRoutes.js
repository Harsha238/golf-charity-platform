import express from "express";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";

const router = express.Router();

// ✅ CREATE DRAW
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 DEBUG

    const { amount } = req.body;

    if (!amount) {
      return res.status(400).json("Amount required");
    }

    const draw = new Draw({
      amount,
      status: "upcoming"
    });

    await draw.save();

    res.json(draw);

  } catch (err) {
    console.log("ERROR:", err); // 👈 IMPORTANT
    res.status(500).json(err.message);
  }
});

// ✅ GET DRAWS
router.get("/", async (req, res) => {
  try {
    const draws = await Draw.find();
    res.json(draws);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/run/:id", async (req, res) => {
  try {
    const draw = await Draw.findById(req.params.id);

    if (!draw) {
      return res.status(404).json("Draw not found");
    }

    console.log("PLAYERS BEFORE RUN:", draw.players);

if (!draw.players || draw.players.length === 0) {
  return res.status(400).json("No players joined");
}

    // 🎯 generate winning numbers
    const winningNumbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 45) + 1
    );

    draw.winningNumbers = winningNumbers;
    draw.status = "completed";

    const winnersList = [];

    // ✅ CALCULATE SCORES
    draw.players.forEach((p) => {
  const matchCount = p.numbers.filter(n =>
    winningNumbers.includes(n)
  ).length;

  p.score = matchCount;
});

    // ✅ FILTER WINNERS (score >= 3)
    const sorted = [...draw.players].sort((a, b) => b.score - a.score);
    const winners = [sorted[0]]; // ALWAYS 1 winner
    
    
    // ✅ CALCULATE PRIZE
    const prizePerWinner =
      winners.length > 0 ? Math.floor(draw.amount / winners.length) : 0;

    // ✅ SAVE WINNERS
    for (let w of winners) {
      w.prize = prizePerWinner;

      const winnerDoc = new Winner({
  userId: w.userId,
  name: w.name || "Player",   // ✅ FIX
  score: w.score || 0,        // ✅ SAFE
  prize: w.prize || 0,        // ✅ SAFE
  date: new Date()
});

      await winnerDoc.save();
      console.log("SAVED WINNER:", winnerDoc); // 👈 DEBUG
      winnersList.push(winnerDoc);
    }

    console.log("PLAYERS:", draw.players);
    await draw.save();

    res.json({
      draw,
      winners: winnersList
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Run draw error");
  }
});

router.post("/join", async (req, res) => {
  try {
    const { drawId, userId, numbers } = req.body;

    if (!drawId || !userId || !numbers) {
      return res.status(400).json("Missing fields");
    }

    const draw = await Draw.findById(drawId);

    if (!draw) {
      return res.status(404).json("Draw not found");
    }

    draw.players.push({
  userId,
  numbers,
  name: req.body.name || "Player"
});

    await draw.save();

    res.json(draw);

  } catch (err) {
    console.log("JOIN ERROR:", err);
    res.status(500).json(err.message);
  }
});

export default router;