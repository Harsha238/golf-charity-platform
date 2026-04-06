import express from "express";

import drawRoutes from "./drawRoutes.js";
import scoreRoutes from "./scoreRoutes.js";
import winnerRoutes from "./winnerRoutes.js";
import userRoutes from "./userRoutes.js";
import Draw from "../models/Draw.js";

const router = express.Router();

// ✅ CONNECT ALL ROUTES
router.use("/draw", drawRoutes);
router.use("/scores", scoreRoutes);
router.use("/winners", winnerRoutes);
router.use("/users", userRoutes);

// ✅ JOIN DRAW (ADD PLAYER)
router.post("/draw/join", async (req, res) => {
  try {
    const { drawId, userId, numbers } = req.body;

    const draw = await Draw.findById(drawId);

    if (!draw) {
      return res.status(404).json("Draw not found");
    }

    draw.players.push({
      userId,
      numbers
    });

    await draw.save();

    res.json(draw);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

export default router;