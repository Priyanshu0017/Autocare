const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Complaint = require("../models/complaintModel");
const Comment = require("../models/commentModel");

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (!users) {
    res.status(404);
    throw new Error("No Users Found");
  } else {
    res.status(200).json(users);
  }
});
const getComplaints = asyncHandler(async (req, res) => {
  const Complaints = await Complaint.find();

  if (!Complaints) {
    res.status(404);
    throw new Error("No Complaints Found");
  } else {
    res.status(200).json(Complaints);
  }
});
const updateComplaint = asyncHandler(async (req, res) => {
  const updatedComplaint = await Complaint.findByIdAndUpdate(
    req.params.cid,
    req.body,
    { new: true }
  );

  if (!updatedComplaint) {
    res.status(400);
    throw new Error("Complaint Not Updated");
  } else {
    res.status(200).json(updatedComplaint);
  }
});
const getComments = asyncHandler(async (req, res) => {
  const Comments = await Comment.find();

  if (!Comments) {
    res.status(404);
    throw new Error("No Complaints Found");
  } else {
    res.status(200).json(Comments);
  }
});
const addComment = asyncHandler(async (req, res) => {
  const { message } = req.body;
  if (!message) {
    res.status(400);
    throw new Error("Please Fill All Details");
  }

  const comment = await Comment.create({
    user: req.user._id,
    complaint: req.params.cid,
    message: message,
    isAdmin : true
  });
  if (!comment) {
    res.status(401);
    throw new Error("Comment Not Created");
  }

  res.status(201).json(comment);
});

module.exports = {
  getUsers,
  getComplaints,
  getComments,
  updateComplaint,
  addComment,
};
