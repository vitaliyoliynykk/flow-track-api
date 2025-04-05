const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/User");

const {
  generateTokens,
  generateNewAccessToken,
  REFRESH_TOKEN_EXPIRATION,
} = require("../utils/generateTokens");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({ email, password_hash: hashedPassword });

    await user.save();

    const userResponse = {
      email: user.email,
      id: user._id,
      profilePictureUrl: user._profile_picture_url,
      name: user.name,
    };

    res.status(201).json(userResponse);
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

    user.refresh_token = refreshToken;

    await user.save();

    const userResponse = {
      email: user.email,
      id: user._id,
      profilePictureUrl: user._profile_picture_url,
      name: user.name,
    };

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: REFRESH_TOKEN_EXPIRATION,
      })
      .json({ accessToken, user: userResponse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/refresh", async (req, res) => {
  const { refreshToken: refresh_token } = req.cookies;

  if (!refresh_token)
    return res.status(401).json({ message: "Not authorized" });

  const user = await User.findOne({ refresh_token });
  if (!user) return res.status(403).json({ message: "Token is invalid" });

  try {
    const newAccessToken = generateNewAccessToken(refresh_token);

    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(403).json({ message: "Token is invalid" });
  }
});

router.post("/logout", async (req, res) => {
  const { refreshToken: refresh_token } = req.cookies;

  if (refresh_token) {
    try {
      console.log("trying to delete token");
      await User.updateOne(
        { refresh_token },
        { $unset: { refresh_token: null } }
      );

      console.log("token deleted");

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      res.status(200).json({ message: "ok" });
    } catch (e) {
      console.error("Logout failed", e);
      res.status(500).json({ message: "Server error during logout" });
    }
  }
});

module.exports = router;
