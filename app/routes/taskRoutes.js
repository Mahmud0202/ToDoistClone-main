const express = require("express");
const { tasks } = require("../models/taskModel");
const { db } = require("../config/db");
const { authenticate } = require("../middleware/authenticate");

const router = express.Router();

// Get User's Tasks
router.get("/", authenticate, async (req, res) => {
    const userTasks = await db.select().from(tasks).where("user_id", req.user.id);
    res.json(userTasks);
});

module.exports = router;
