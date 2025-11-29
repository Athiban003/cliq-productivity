const express = require("express");
const router = express.Router();

const {
  startRecording,
  stopRecording,
  handleIncomingMessage,
} = require("../controllers/noteController");

router.post("/start", startRecording);
router.post("/end", stopRecording);
router.post("/message", handleIncomingMessage);

module.exports = router;
