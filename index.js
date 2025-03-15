const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
require("dotenv").config();

const app = express();

connectDB();

app.get("/", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`FlowTrack API listening on port ${PORT}`);
});
