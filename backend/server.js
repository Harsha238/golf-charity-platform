import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import winnerRoutes from "./routes/winnerRoutes.js";

import "./models/User.js";
import apiRoutes from "./routes/api.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "*"
}));
app.use(express.json());
app.use("/api/winners", winnerRoutes);

// ✅ Create HTTP server
const server = http.createServer(app);

// ✅ Socket setup
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "*",
  },
});

io.on("connection", () => {
  console.log("User connected 🔌");
});

// ✅ Routes
app.use("/api", apiRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API running 🚀");
});

// ❗ OPTIONAL (remove later)
app.post("/check", (req, res) => {
  res.send("CHECK WORKING");
});

// ✅ DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected ✅"))
  .catch(err => console.log("DB error:", err));

// ✅ Use env PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});