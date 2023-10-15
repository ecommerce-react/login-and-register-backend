const express = require("express");
const router = express.Router();

// Controllers
const { login, register } = require("../controllers/authController");

// Routes
// LOGIN
router.post("/login", login);
// REGISTER
router.post("/register", register);

module.exports = router;
