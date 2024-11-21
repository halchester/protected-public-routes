const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ completedTodos: -1 })
      .limit(10)
      .select("username completedTodos");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

module.exports = router;
