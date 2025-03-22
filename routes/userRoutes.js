const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post('/update-user-profile-picture-url', async ({ user, body }, res) => {
  const { profilePictureUrl } = body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user.id },
      { profile_picture_url: profilePictureUrl },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (e) {
    console.error('Failed to update user profile picture', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
