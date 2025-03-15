const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  name: { type: String, required: false },
  profile_picture_url: { type: String, required: false },
  refresh_token: { type: String, required: false },
});

module.exports = mongoose.model("users", UserSchema);
