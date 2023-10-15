const express = require("express");
const router = express.Router();

// Controllers
const {
  login,
  register,
  checkUserLoggedIn,
} = require("../controllers/authController");

// Routes
router.post("/register", register);
router.post("/login", login);
router.post("/user-logged-in", checkUserLoggedIn);

module.exports = router;
