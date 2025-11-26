const Task = require("../models/Task.js");

const controlBot = async (req, res) => {
  const text = req.body.text || "";

  if (text.startsWith("addtask")) {
    const taskText = text.replace("addtask", "").trim();
    await Task.create({ text: taskText });

    return res.json({
      text: `✔ Task added: ${taskText}`,
    });
  }

  res.json({ text: "Unknown command" });
};

module.exports = controlBot;
