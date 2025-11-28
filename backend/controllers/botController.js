const Task = require("../models/Task.js");

const controlBot = async (req, res) => {
  console.log("Received payload:", req.body);

  const text = req.body.command || "";
  if (text.startsWith("task add")) {
    const taskText = text.replace("task add", "").trim();

    await Task.create({ text: taskText });

    return res.status(200).json({
      message: `✔ isit work added: ${text}`,
    });
  }

  return res.json({
    message: "Unknown command. Try: /task add Buy milk",
  });
};

module.exports = controlBot;
