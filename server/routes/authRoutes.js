const express = require("express");
const {
  register,
  login,
  privateController,
} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// Method : post
// ACCESS : Public
// Route : /api/user/
router.post("/register", register);

// Method : post
// ACCESS : Public
// Route : /api/user/login
router.post("/login", login);

router.post("/private", protect, privateController);

module.exports = router;
