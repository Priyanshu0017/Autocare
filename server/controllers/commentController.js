const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const Complaint = require("../models/complaintModel");

const getComments = asyncHandler(async (req, res) => {
  // Find if user exists
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not Found");
  }

  const comments = await Comment.find({ complaint: complaint._id });
  if (!comments) {
    res.status(400);
    throw new Error("Comments Not Found");
  } else {
    res.status(200);
    res.json(comments);
  }
});

const addCommment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(401);
    throw new Error("Invalid Request");
  }

  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) {
    res.status(400);
    throw new Error("Complaint Not Found");
  }

  const comment = await Comment.create({
    user: user._id,
    complaint: complaint._id,
    message: text,
  });
  if (!comment) {
    res.status(401);
    throw new Error("Comment Not Raised");
  }

  res.status(201).json(comment)

});

module.exports = { getComments, addCommment };
