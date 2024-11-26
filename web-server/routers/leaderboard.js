const express = require("express");
const { getLeaderboard } = require("../controllers/leaderboard.controller");

const router = express.Router();

router.get("/", getLeaderboard);

module.exports = router;
