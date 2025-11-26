const express = require("express");
const router = express.Router();

const controlBot = require("../controllers/botController");

router.post("/cliq", controlBot);

module.exports = router;
