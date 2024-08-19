const Activity = require('../models/Activity');

// Log a user activity
exports.logActivity = async (req, res) => {
  const { userId, activity } = req.body;

  try {
    const newActivity = new Activity({ userId, activity });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user activities
exports.getUserActivities = async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.userId });
    res.json(activities);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
