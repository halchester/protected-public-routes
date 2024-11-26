const user = require("../models/user");

const getLeaderboard = async (req, res) => {
  try {
    const users = await user
      .find()
      .sort({ completedTodos: -1 })
      .limit(10)
      .select("username completedTodos");

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};

module.exports = { getLeaderboard };
