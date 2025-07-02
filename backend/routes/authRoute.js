const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit')
const authController = require("../controller/authController");

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 5,
    message: "Too many login attempts, please try again later"
})

router.post("/register", authController.register);
router.post("/login", limiter, authController.login);

module.exports = router;
