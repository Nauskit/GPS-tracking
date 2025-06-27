const express = require("express");
const router = express.Router();
const locationLogController = require("../controller/locationLogController");

router.post("/", locationLogController.systemLocationLog);
// router.get("/:id", locationLogController.getSystemLocationLog);

module.exports = router;
