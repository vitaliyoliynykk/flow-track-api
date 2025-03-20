const mongoose = require("mongoose");

const SettingsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  push_notifications_enabled: { type: Boolean, required: true },
  pomodoro_configuration: { type: Object, required: false },
});

module.exports = mongoose.model("settings", SettingsSchema);
