import express from "express";

import drawRoutes from "./drawRoutes.js";
import scoreRoutes from "./scoreRoutes.js";
import winnerRoutes from "./winnerRoutes.js";
import userRoutes from "./userRoutes.js";

const router = express.Router();

// ✅ CONNECT ALL ROUTES
router.use("/draw", drawRoutes);
router.use("/scores", scoreRoutes);
router.use("/winners", winnerRoutes);
router.use("/users", userRoutes);

export default router;