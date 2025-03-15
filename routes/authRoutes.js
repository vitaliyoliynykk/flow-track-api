const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const generateTokens = require("../utils/generateTokens");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ email, password_hash: hashedPassword });

    await user.save();

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: `User with email ${email} not found` });

    const isMatch = await bcrypt.compare(password, user.password_hash);

    if (!isMatch)
      return res.status(400).json({ message: "Password is incorrect" });

    const { accessToken, refreshToken } = generateTokens(user._id);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Помилка сервера" });
  }
});

module.exports = router;
