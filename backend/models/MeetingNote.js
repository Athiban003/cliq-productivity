const mongoose = require("mongoose");

const meetingNoteSchema = new mongoose.Schema(
  {
    channel_id: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date },
    summary: { type: String },
    key_decisions: [{ type: String }],
    action_items: [{ type: mongoose.Schema.Types.Mixed }], // Array of objects with task, owner, deadline
    participants: [{ type: String }], // user IDs
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

module.exports = mongoose.model("MeetingNote", meetingNoteSchema);
