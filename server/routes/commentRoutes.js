const express = require("express");
const protect = require("../middlewares/authMiddleware");
const {
  getComments,
  addCommment,
} = require("../controllers/commentController");
const router = express.Router({ mergeParams: true });

// get all comments
router.get("/", protect, getComments);

// create comment
router.post("/", protect, addCommment);

module.exports = router;
