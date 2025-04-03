const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  status: { type: String, required: true, default: "new" },
  end_time: { type: Date, required: false },
});

module.exports = mongoose.model("sessions", SessionSchema);
