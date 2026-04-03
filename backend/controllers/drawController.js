import Score from "../models/Score.js";
import Winner from "../models/Winner.js";
import { io } from "../server.js";

export const runDraw = async (req, res) => {
  try {
    const scores = await Score.find();

    if (scores.length === 0) {
      return res.status(400).json({ message: "No scores available" });
    }

    const top = scores.sort((a, b) => b.value - a.value)[0];

    const winner = await Winner.create({
      userId: top.userId,
      score: top.value
    });

    const populated = await winner.populate("userId", "name");

    io.emit("newWinner", populated);

    res.json(populated);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Draw failed" });
  }
};