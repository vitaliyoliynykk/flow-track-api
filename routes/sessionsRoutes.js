const express = require("express");

const Session = require("../models/Session");

const router = express.Router();

router.put("/", async ({ user, body }, res) => {
  try {
    const session = {
      user_id: user.id,
      status: body.status,
      end_time: body.endTime,
    };

    const result = await Session.findOneAndUpdate(
      { user_id: user.id },
      session,
      { new: true, upsert: true }
    );

    res.status(200).json(result._id);
  } catch (e) {
    console.error("Failed to update a session", e);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/", async ({ user }, res) => {
  try {
    const result = await Session.findOneAndDelete({ user_id: user.id });

    if (!result) {
      res.status(400).json({ error: "Used doesn't have active session" });
    } else {
      res.status(200).json({ ok: true });
    }
  } catch (e) {
    console.error("Failed to delete a session", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
