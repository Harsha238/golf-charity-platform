import express from "express";
import Draw from "../models/Draw.js";

const router = express.Router();

// ✅ CREATE DRAW
router.post("/", async (req, res) => {
  try {
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
    console.log(err);
    res.status(500).json("Server error");
  }
});

// ✅ GET DRAWS
router.get("/", async (req, res) => {
  const draws = await Draw.find();
  res.json(draws);
});

export default router;