const express = require('express');

const Settings = require('../models/Settings');

const router = express.Router();

router.get('/', async ({ user }, res) => {
  try {
    const { pomodoro_configuration, push_notifications_enabled } =
      await Settings.findOne({ user_id: user.id });

    res.status(200).json({
      pomodoroConfiguration: pomodoro_configuration,
      pushNotificationsEnabled: push_notifications_enabled,
    });
  } catch (e) {
    console.error('Failed to get settings', e);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/', async ({ user, body }, res) => {
  try {
    const userSettings = {
      user_id: user.id,
      push_notifications_enabled: body.pushNotificationsEnabled,
      pomodoro_configuration: body.pomodoroConfiguration,
    };

    const { pomodoro_configuration, push_notifications_enabled } =
      await Settings.findOneAndUpdate(
        { user_id: userSettings.user_id },
        userSettings,
        { new: true, upsert: true }
      );

    res.status(200).json({
      pomodoroConfiguration: pomodoro_configuration,
      pushNotificationsEnabled: push_notifications_enabled,
    });
  } catch (e) {
    console.error('Failed to update settings', e);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
