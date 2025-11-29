const mongoose = require("mongoose");

const sprintReportSchema = new mongoose.Schema(
  {
    week_start: { type: Date, required: true },
    week_end: { type: Date, required: true },
    summary: { type: String },
    highlights: [{ type: String }], // JSON array of strings
    risks: [{ type: String }], // JSON array of strings
    suggestions: [{ type: String }], // JSON array of strings
    completed_count: { type: Number, default: 0 },
    in_progress_count: { type: Number, default: 0 },
    overdue_count: { type: Number, default: 0 },
    team_performance_score: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

module.exports = mongoose.model("SprintReport", sprintReportSchema);
