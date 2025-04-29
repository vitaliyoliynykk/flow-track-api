const express = require("express");

const Statistic = require("../models/Statistic");

const router = express.Router();

router.post("/user-daily", async ({ user, body }, res) => {
  try {
    const statistics = await Statistic.find({
      user_id: user.id,
      date: {
        $gte: new Date(new Date(body.date).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(body.date).setHours(23, 59, 59, 999)),
      },
    });

    res.status(200).json(statistics);
  } catch (e) {
    console.error("Failed to retrieve tasks", e);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/", async ({ user, body }, res) => {
  try {
    const filter = {
      user_id: user.id,
      task_id: body.task_id,
      date: {
        $gte: new Date(new Date(body.date).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(body.date).setHours(23, 59, 59, 999)),
      },
    };

    const update = {
      $set: {
        user_id: user.id,
        task_id: body.task_id,
        total_sessions: body.sessions_completed,
        goal_reached: body.goal_reached,
        date: new Date(body.date),
      },
    };

    const options = { upsert: true, new: true };

    const result = await Statistic.findOneAndUpdate(filter, update, options);

    res.status(200).json(result);
  } catch (e) {
    console.error("Failed to upsert statistic record", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
