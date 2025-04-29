const mongoose = require("mongoose");

const StatisticSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  task_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tasks",
    required: true,
  },
  total_sessions: { type: Number, required: true },
  goal_reached: { type: Boolean, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("statistics", StatisticSchema);
