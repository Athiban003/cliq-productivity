const mongoose = require("mongoose");

const reminderQueueSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    reminder_time: { type: Date, required: true },
    message: { type: String, required: true },
    related_entity_type: {
      type: String,
      enum: ["task", "meeting", "plan_session"],
    },
    related_entity_id: { type: String },
    status: {
      type: String,
      enum: ["pending", "sent", "failed"],
      default: "pending",
    },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

module.exports = mongoose.model("ReminderQueue", reminderQueueSchema);
