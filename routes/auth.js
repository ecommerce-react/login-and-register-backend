const express = require("express");
const router = express.Router();

// Controllers
const { login, register } = require("../controllers/authController");

// Routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;
