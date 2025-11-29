const mongoose = require("mongoose");

const subtaskSchema = new mongoose.Schema(
  {
    parent_task_id: { type: String, required: true },
    title: { type: String, required: true },
    status: { type: String, enum: ["todo", "completed"], default: "todo" },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtask", subtaskSchema);
