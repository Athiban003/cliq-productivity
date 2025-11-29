const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true },
  productivity_score: { type: Number, default: 0 },
  tasks_completed: { type: Number, default: 0 },
  tasks_pending: { type: Number, default: 0 },
  tasks_overdue: { type: Number, default: 0 },
  collaboration_score: { type: Number, default: 0 },
  last_updated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("UserProfile", userProfileSchema);
