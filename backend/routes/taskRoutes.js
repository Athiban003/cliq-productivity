const express = require("express");
const router = express.Router();

const {
  createTask,
  listTask,
  toggleTask,
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", listTask);
router.patch("/:id", toggleTask);

module.exports = router;
