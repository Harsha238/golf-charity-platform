import express from "express";
import Draw from "../models/Draw.js";
import Winner from "../models/Winner.js";

const router = express.Router();

// ✅ CREATE DRAW
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body);

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
    console.log("ERROR:", err);
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

// ✅ RUN DRAW
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

    // ✅ CALCULATE SCORES
    draw.players.forEach((p) => {
      const matchCount = p.numbers.filter(n =>
        winningNumbers.includes(n)
      ).length;

      p.score = matchCount;
    });

    // 🔥 FORCE SAVE ONE WINNER (TEST - guaranteed)
    const winnerDoc = new Winner({
      userId: "testUser",
      name: "Test Player",
      score: 5,
      prize: draw.amount || 1000,
      date: new Date()
    });

    await winnerDoc.save();
    console.log("FORCED WINNER SAVED:", winnerDoc);

    await draw.save();

    res.json({
      draw,
      winners: [winnerDoc]
    });

  } catch (err) {
    console.log(err);
    res.status(500).json("Run draw error");
  }
});

// ✅ JOIN DRAW
router.post("/join", async (req, res) => {
  try {
    const { drawId, userId, numbers, name } = req.body;

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
      name: name || "Player"
    });

    await draw.save();

    res.json(draw);

  } catch (err) {
    console.log("JOIN ERROR:", err);
    res.status(500).json(err.message);
  }
});

export default router;