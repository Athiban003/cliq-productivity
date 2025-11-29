const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    workast_id: { type: String, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    assignee: { type: String }, // can store user ID
    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },
    deadline: { type: Date },
    status: {
      type: String,
      enum: ["todo", "in_progress", "blocked", "completed"],
      default: "todo",
    },
    dependencies: [{ type: String }], // array of task IDs
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Task", taskSchema);
