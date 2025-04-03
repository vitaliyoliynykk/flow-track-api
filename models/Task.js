const mongoose = require("mongoose");

const TasksSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  title: { type: String, required: true },
  status: { type: String, required: true, default: "new" },
  sessions_goal: { type: Number, required: false },
  sessions_completed: { type: Number, required: false },
  end_date: { type: Date, required: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("tasks", TasksSchema);
