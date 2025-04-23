const express = require("express");
const {
  getComplaints,
  raiseComplaint,
  getComplaint,
  updateComplaint,
} = require("../controllers/complaintController");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// Get all complaints
router.get("/",protect, getComplaints);

// Create a new complaint
router.post("/",protect, raiseComplaint);

// Get a specific complaint by ID
router.get("/:id",protect, getComplaint);

// Update a complaint by ID
router.put("/:id",protect, updateComplaint);

router.use('/:id/comment',require('./commentRoutes'))

module.exports = router