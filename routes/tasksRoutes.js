const express = require("express");

const Task = require("../models/Task");

const router = express.Router();

router.get("/", async ({ user }, res) => {
  try {
    const tasks = await Task.find({ user_id: user.id });

    res.status(200).json(tasks);
  } catch (e) {
    console.error("Failed to retrieve tasks", e);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", async ({ user, body }, res) => {
  try {
    const task = {
      user_id: user.id,
      title: body.title,
      status: body.status,
      sessions_goal: body.sessions_goal,
      end_date: body.endDate,
    };

    const result = await Task.insertOne(task);

    res.status(200).json(result);
  } catch (e) {
    console.error("Failed to create a task", e);
    res.status(500).json({ error: "Server error" });
  }
});

router.patch("/update-completed", async ({ user, body }, res) => {
  try {
    const result = await Task.findByIdAndUpdate(
      body.task_id,
      { sessions_completed: body.sessions_completed },
      { new: true }
    );

    res.status(200).json(result);
  } catch (e) {
    console.error("Failed to create a task", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
