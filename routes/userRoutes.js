const express = require("express");

const User = require("../models/User");

const router = express.Router();

router.get("/", async ({ user }, res) => {
  try {
    const user = await User.findById(user.id);

    const userResponse = {
      email: user.email,
      id: user._id,
      profilePictureUrl: user._profile_picture_url,
      name: user.name,
    };

    res.status(200).json(userResponse);
  } catch (e) {
    console.error("Failed to find a user", e);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/update-user-profile-picture-url", async ({ user, body }, res) => {
  const { profilePictureUrl } = body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { profile_picture_url: profilePictureUrl },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    console.error("Failed to update user profile picture", e);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
