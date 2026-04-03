import express from "express";

import scoreRoutes from "./scoreRoutes.js";
import drawRoutes from "./drawRoutes.js";
import winnerRoutes from "./winnerRoutes.js";

const router = express.Router();

// ✅ IMPORTANT: use correct base paths
router.use("/scores", scoreRoutes);
router.use("/draw", drawRoutes);
router.use("/winners", winnerRoutes);

export default router;