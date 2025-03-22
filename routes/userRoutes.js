const express = require('express');

const User = require('../models/User');

const router = express.Router();

router.post(
  '/:userId/update-user-profile-picture',
  async ({ body, params }, res) => {
    const { userId } = params;
    const { profilePicture } = body;

    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { profile_picture_url: profilePicture },
        { new: true }
      );

      res.status(200).json(updatedUser);
    } catch (e) {
      console.error('Failed to update user profile picture', e);
      res.status(500).json({ error: 'Server error' });
    }
  }
);

module.exports = router;
