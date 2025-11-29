const config = require("./config/config");

const express = require("express");
const server = express();

const cors = require("cors");
const connectDb = require("./config/db");
connectDb();

const PORT = config.port.port || 3000;

const botRoutes = require("./routes/botRoutes");
const noteRoutes = require("./routes/noteRoutes");

server.use(cors());
server.use(express.json());

server.use("/webhook", botRoutes);
// server.use("/task");
server.use("/notes", noteRoutes);

server.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "❌ Route not found",
  });
});

server.listen(PORT, () => {
  console.log("server is running");
});
