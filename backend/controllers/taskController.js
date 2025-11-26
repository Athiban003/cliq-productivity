const Task = require("../models/Task.js");

const createTask = async (req, res) => {
  const { text } = req.body;
  const task = await Task.create({ text });
  res.json({ success: true, task });
};

const listTask = async (req, res) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

const toggleTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

module.exports = { createTask, listTask, toggleTask };
