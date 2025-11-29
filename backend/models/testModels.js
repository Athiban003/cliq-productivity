const connectDb = require("../config/db");
const Task = require("./Task");

async function test() {
  await connectDb();

  const task = new Task({
    workast_id: "wa_001",
    title: "Test Task",
    description: "Check if Mongo works",
    assignee: "user_001",
    priority: "high",
  });

  await task.save();
  console.log("Task saved!", task);
  process.exit();
}

test();
