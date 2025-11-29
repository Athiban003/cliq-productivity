const mongoose = require("mongoose");

const dailyPlanSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    plan_date: { type: Date, required: true },
    schedule_json: [{ type: mongoose.Schema.Types.Mixed, required: true }], // Array of time blocks
    goals: { type: String },
    working_hours: { type: Number },
    focus_type: { type: String },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: false } }
);

module.exports = mongoose.model("DailyPlan", dailyPlanSchema);
