require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const connectDb = require("./config/db");
connectDb();

const PORT = process.env.PORT || 3000;

const taskRoutes = require("./routes/taskRoutes");
const botRoutes = require("./routes/botRoutes");

server.use(cors());
server.use(express.json());

server.use("/api/tasks", taskRoutes);
server.use("/webhook", botRoutes);

server.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

server.listen(PORT, () => {
  console.log("server is running");
});
