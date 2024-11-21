require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

// Routers
const authRouter = require("./routers/auth");
const todoRouter = require("./routers/todo");
const leaderboardRouter = require("./routers/leaderboard");

// Initialize app
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/todos", todoRouter);
app.use("/leaderboard", leaderboardRouter);

const run = async () => {
  await connectDB();
  // Start Server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

run();
